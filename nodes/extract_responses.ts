import { HarDocument, ExtractResponsesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toResponseInfo } from './lib/harParse';
import { responseToMsg } from './lib/mappers';
import { MAX_ENTRIES_DETAIL, MAX_BODY_TEXT_CHARS } from './lib/limits';

/**
 * Extract every response in full: status, status text, HTTP version,
 * headers, cookies, redirect URL, and content metadata (MIME type, size,
 * and a capped/truncatable text preview — response bodies can be large or
 * base64-encoded binary, so the preview is bounded and
 * content.text_truncated/encoding say when and how). Capped at 500 entries;
 * `truncated` signals a larger document. Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractResponses(ax: AxiomContext, input: HarDocument): ExtractResponsesResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractResponsesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_DETAIL;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_DETAIL);
  const responses = slice.map((e, i) => responseToMsg(toResponseInfo(e, i, MAX_BODY_TEXT_CHARS)));
  out.setResponsesList(responses);
  out.setCount(responses.length);
  out.setTruncated(truncated);
  return out;
}
