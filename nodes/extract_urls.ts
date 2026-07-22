import { HarDocument, ExtractUrlsResult, EntryUrl } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar } from './lib/harParse';
import { MAX_ENTRIES_LIST } from './lib/limits';

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

/**
 * Extract every request URL in entry order, each correlated back to its
 * index (not deduplicated — use ExtractDomains for a deduplicated host
 * inventory). Capped at 3000 entries; `count` reflects the returned
 * (possibly truncated) set. Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractUrls(ax: AxiomContext, input: HarDocument): ExtractUrlsResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractUrlsResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);
  const urls = slice.map((eRaw, i) => {
    const e = (eRaw ?? {}) as Record<string, unknown>;
    const req = (e.request ?? {}) as Record<string, unknown>;
    const m = new EntryUrl();
    m.setIndex(i);
    m.setUrl(str(req.url));
    return m;
  });
  out.setUrlsList(urls);
  out.setCount(urls.length);
  out.setTruncated(truncated);
  return out;
}
