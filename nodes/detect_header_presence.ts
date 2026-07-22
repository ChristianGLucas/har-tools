import { HeaderValueRequest, DetectHeaderPresenceResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, parseDirection, hasHeader, toEntrySummary } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST } from './lib/limits';

/**
 * Return every entry that has one named header present at all
 * (case-insensitive, direction: "request" | "response" | "" for both) — the
 * value is not inspected, only presence. total_entries gives the
 * denominator for the match count (the number of entries actually
 * scanned — see `truncated`). Deterministic (entry order); never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function detectHeaderPresence(ax: AxiomContext, input: HeaderValueRequest): DetectHeaderPresenceResult {
  const parsed = parseHar(input.getText());
  const out = new DetectHeaderPresenceResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const headerName = input.getHeaderName().trim();
  if (headerName.length === 0) {
    out.setOk(false);
    out.setError('header_name must not be empty');
    return out;
  }
  const dir = parseDirection(input.getDirection());
  if (!dir.ok) {
    out.setOk(false);
    out.setError(dir.error);
    return out;
  }

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);
  const headerNameLower = headerName.toLowerCase();
  const matches = slice
    .map((eRaw, i) => ({ eRaw, summary: toEntrySummary(eRaw, i) }))
    .filter(({ eRaw }) => hasHeader(eRaw, headerNameLower, dir))
    .map(({ summary }) => entrySummaryToMsg(summary));

  out.setMatchesList(matches);
  out.setCount(matches.length);
  out.setTotalEntries(slice.length);
  out.setTruncated(truncated);
  return out;
}
