import { HarDocument, ExtractResponsesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toResponseInfo } from './lib/harParse';
import { responseToMsg } from './lib/mappers';

/**
 * Extract every response in full: status, status text, HTTP version,
 * headers, cookies, redirect URL, and content metadata (MIME type, size,
 * and body text — response bodies can be base64-encoded binary, and
 * content.encoding says when). Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractResponses(ax: AxiomContext, input: HarDocument): ExtractResponsesResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractResponsesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const responses = parsed.entriesRaw.map((e, i) => responseToMsg(toResponseInfo(e, i)));
  out.setResponsesList(responses);
  out.setCount(responses.length);
  return out;
}
