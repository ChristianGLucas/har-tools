import { HarDocument, ListEntriesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toEntrySummary } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';

/**
 * List every captured entry as a lightweight summary: index, start time,
 * request method, request URL, response status, and total time — the shape
 * every filter/sort node in this package also returns. Deterministic
 * (entry order); never throws — a malformed document returns ok=false with
 * a structured error.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listEntries(ax: AxiomContext, input: HarDocument): ListEntriesResult {
  const parsed = parseHar(input.getText());
  const out = new ListEntriesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const entries = parsed.entriesRaw.map((e, i) => entrySummaryToMsg(toEntrySummary(e, i)));
  out.setEntriesList(entries);
  out.setCount(entries.length);
  return out;
}
