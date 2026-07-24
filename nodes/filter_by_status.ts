import { StatusFilterRequest, ListEntriesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, buildFilterRows, parseStatusFilter } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';

/**
 * The error-finding node: return only entries whose response status matches
 * status_filter — an exact 3-digit code ("404") or a status-class shorthand
 * ("4xx", "5xx", etc). An entry with no recorded response (status 0) never
 * matches. An invalid filter string returns a structured error.
 * Deterministic (entry order); never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function filterByStatus(ax: AxiomContext, input: StatusFilterRequest): ListEntriesResult {
  const parsed = parseHar(input.getText());
  const out = new ListEntriesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const matcher = parseStatusFilter(input.getStatusFilter());
  if (!matcher.ok) {
    out.setOk(false);
    out.setError(matcher.error);
    return out;
  }

  const rows = buildFilterRows(parsed.entriesRaw);
  const matched = rows.filter((r) => matcher.matches(r.summary.status)).map((r) => entrySummaryToMsg(r.summary));
  out.setEntriesList(matched);
  out.setCount(matched.length);
  return out;
}
