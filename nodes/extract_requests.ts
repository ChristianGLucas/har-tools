import { HarDocument, ExtractRequestsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toRequestInfo } from './lib/harParse';
import { requestToMsg } from './lib/mappers';

/**
 * Extract every request in full: method, URL, HTTP version, headers,
 * query-string parameters, cookies, and post body (when present).
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

  const requests = parsed.entriesRaw.map((e, i) => requestToMsg(toRequestInfo(e, i)));
  out.setRequestsList(requests);
  out.setCount(requests.length);
  return out;
}
