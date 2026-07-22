import { HarDocument, ExtractDomainsResult, DomainCount } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, hostOf } from './lib/harParse';
import { MAX_ENTRIES_LIST } from './lib/limits';

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

/**
 * The network-inventory node: every distinct host contacted, with how many
 * entries targeted it, sorted alphabetically by host for deterministic
 * output. Malformed request URLs are skipped, not fatal. Never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractDomains(ax: AxiomContext, input: HarDocument): ExtractDomainsResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractDomainsResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);
  const counts = new Map<string, number>();
  for (const eRaw of slice) {
    const e = (eRaw ?? {}) as Record<string, unknown>;
    const req = (e.request ?? {}) as Record<string, unknown>;
    const host = hostOf(str(req.url));
    if (!host) continue;
    counts.set(host, (counts.get(host) ?? 0) + 1);
  }

  const domains = Array.from(counts.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([domain, count]) => {
      const m = new DomainCount();
      m.setDomain(domain);
      m.setCount(count);
      return m;
    });
  out.setDomainsList(domains);
  out.setCount(domains.length);
  out.setTruncated(truncated);
  return out;
}
