import { HarDocument, ExtractRequestsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toRequestInfo } from './lib/harParse';
import { requestToMsg } from './lib/mappers';
import { MAX_ENTRIES_DETAIL, MAX_BODY_TEXT_CHARS } from './lib/limits';

/**
 * Extract every request in full: method, URL, HTTP version, headers,
 * query-string parameters, cookies, and post body (when present, with a
 * capped/truncatable text preview). Capped at 500 entries (request detail
 * is heavier than a summary); `truncated` signals a larger document.
 * Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractRequests(ax: AxiomContext, input: HarDocument): ExtractRequestsResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractRequestsResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_DETAIL;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_DETAIL);
  const requests = slice.map((e, i) => requestToMsg(toRequestInfo(e, i, MAX_BODY_TEXT_CHARS)));
  out.setRequestsList(requests);
  out.setCount(requests.length);
  out.setTruncated(truncated);
  return out;
}
