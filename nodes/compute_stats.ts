import { HarDocument, ComputeStatsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toEntrySummary } from './lib/harParse';
import { countEntry, entrySummaryToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST } from './lib/limits';

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}
function num(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}
function obj(v: unknown): Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

function tally(counts: Map<string, number>, key: string): void {
  if (!key) return;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

function toSortedEntries(counts: Map<string, number>) {
  return Array.from(counts.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([key, count]) => countEntry(key, count));
}

/**
 * Pure aggregation over the parsed entries: total entry count, total
 * response transfer size (sum of content.size), total time (sum of
 * entry.time), counts by response status class, counts by response MIME
 * type, and the 3 slowest entries by entry.time. All figures are computed
 * once over a single pass; nothing is fetched or estimated. Deterministic;
 * never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function computeStats(ax: AxiomContext, input: HarDocument): ComputeStatsResult {
  const parsed = parseHar(input.getText());
  const out = new ComputeStatsResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);

  let totalTransferSize = 0;
  let totalTime = 0;
  const byStatusClass = new Map<string, number>();
  const byMimeType = new Map<string, number>();
  const summaries = slice.map((eRaw, i) => toEntrySummary(eRaw, i));

  slice.forEach((eRaw, i) => {
    const e = obj(eRaw);
    const response = obj(e.response);
    const content = obj(response.content);
    const size = num(content.size, 0);
    if (size > 0) totalTransferSize += size;
    totalTime += num(e.time, 0);

    const status = summaries[i].status;
    if (status > 0) tally(byStatusClass, `${Math.floor(status / 100)}xx`);
    const mimeType = str(content.mimeType);
    if (mimeType) tally(byMimeType, mimeType);
  });

  const slowest = [...summaries]
    .sort((a, b) => (b.time !== a.time ? b.time - a.time : a.index - b.index))
    .slice(0, 3);

  out.setEntryCount(summaries.length);
  out.setTotalTransferSize(totalTransferSize);
  out.setTotalTime(totalTime);
  out.setCountByStatusClassList(toSortedEntries(byStatusClass));
  out.setCountByMimeTypeList(toSortedEntries(byMimeType));
  out.setSlowestList(slowest.map(entrySummaryToMsg));
  out.setTruncated(truncated);
  return out;
}
