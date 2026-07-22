import { HarDocument, ExtractCookiesResult, EntryCookie } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toCookies } from './lib/harParse';
import { cookieToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST } from './lib/limits';

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}
function obj(v: unknown): Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

/**
 * Extract every cookie SET across all responses (each response's cookies
 * array), correlated back to the entry index and URL that set it.
 * Request-carried cookies are not included here — use ExtractRequests to
 * see cookies sent. Capped at 3000 entries scanned; `truncated` signals a
 * larger document. Deterministic (entry, then declared cookie order); never
 * throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractCookies(ax: AxiomContext, input: HarDocument): ExtractCookiesResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractCookiesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);
  const cookies: EntryCookie[] = [];
  slice.forEach((eRaw, i) => {
    const e = obj(eRaw);
    const request = obj(e.request);
    const response = obj(e.response);
    const url = str(request.url);
    for (const c of toCookies(response.cookies)) {
      const m = new EntryCookie();
      m.setIndex(i);
      m.setUrl(url);
      m.setCookie(cookieToMsg(c));
      cookies.push(m);
    }
  });

  out.setCookiesList(cookies);
  out.setCount(cookies.length);
  out.setTruncated(truncated);
  return out;
}
