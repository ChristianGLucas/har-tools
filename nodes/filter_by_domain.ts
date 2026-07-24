import { DomainFilterRequest, ListEntriesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, buildFilterRows } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';

/**
 * Return only entries whose request URL host equals domain
 * (case-insensitive exact match; no subdomain expansion or wildcarding —
 * chain with ExtractDomains to discover the exact hosts present first). An
 * empty domain returns a structured error. Deterministic (entry order);
 * never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function filterByDomain(ax: AxiomContext, input: DomainFilterRequest): ListEntriesResult {
  const parsed = parseHar(input.getText());
  const out = new ListEntriesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const domain = input.getDomain().trim().toLowerCase();
  if (domain.length === 0) {
    out.setOk(false);
    out.setError('domain must not be empty');
    return out;
  }

  const rows = buildFilterRows(parsed.entriesRaw);
  const matched = rows.filter((r) => r.host === domain).map((r) => entrySummaryToMsg(r.summary));
  out.setEntriesList(matched);
  out.setCount(matched.length);
  return out;
}
