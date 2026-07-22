import { HarDocument, ListEntriesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toEntrySummary } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST } from './lib/limits';

/**
 * List every captured entry as a lightweight summary: index, start time,
 * request method, request URL, response status, and total time — the shape
 * every filter/sort node in this package also returns. Capped at 3000
 * entries; `truncated` is true if the document declared more. Deterministic
 * (entry order); never throws — a malformed or oversized document returns
 * ok=false with a structured error.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listEntries(ax: AxiomContext, input: HarDocument): ListEntriesResult {
  const parsed = parseHar(input.getText());
  const out = new ListEntriesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);
  const entries = slice.map((e, i) => entrySummaryToMsg(toEntrySummary(e, i)));
  out.setEntriesList(entries);
  out.setCount(entries.length);
  out.setTruncated(truncated);
  return out;
}
