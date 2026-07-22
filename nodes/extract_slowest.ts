import { TopNRequest, ListEntriesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toEntrySummary } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST, DEFAULT_TOP_N, MAX_TOP_N } from './lib/limits';

function obj(v: unknown): Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}
function num(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}

/**
 * Return the top `limit` entries (default 10) ranked by sort_by — "time"
 * (entry.time, the default) or "size" (response content.size) — descending,
 * with ties broken by ascending entry index for determinism. limit <= 0
 * defaults to 10; limit is capped at 1000. An unrecognized sort_by returns
 * a structured error.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractSlowest(ax: AxiomContext, input: TopNRequest): ListEntriesResult {
  const parsed = parseHar(input.getText());
  const out = new ListEntriesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const sortByRaw = (input.getSortBy() ?? '').trim().toLowerCase();
  const sortBy = sortByRaw === '' ? 'time' : sortByRaw;
  if (sortBy !== 'time' && sortBy !== 'size') {
    out.setOk(false);
    out.setError(`invalid sort_by ${JSON.stringify(input.getSortBy())}: expected "time" or "size"`);
    return out;
  }

  let limit = input.getLimit();
  if (!Number.isFinite(limit) || limit <= 0) limit = DEFAULT_TOP_N;
  if (limit > MAX_TOP_N) limit = MAX_TOP_N;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);

  const withSortKey = slice.map((eRaw, i) => {
    const summary = toEntrySummary(eRaw, i);
    let key = summary.time;
    if (sortBy === 'size') {
      const e = obj(eRaw);
      const response = obj(e.response);
      const content = obj(response.content);
      key = Math.max(0, num(content.size, 0));
    }
    return { summary, key };
  });

  withSortKey.sort((a, b) => (b.key !== a.key ? b.key - a.key : a.summary.index - b.summary.index));
  const top = withSortKey.slice(0, limit).map((r) => entrySummaryToMsg(r.summary));

  out.setEntriesList(top);
  out.setCount(top.length);
  out.setTruncated(truncated);
  return out;
}
