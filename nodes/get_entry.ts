import { EntryIndexRequest, GetEntryResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toFullEntry } from './lib/harParse';
import { fullEntryToMsg } from './lib/mappers';
import { MAX_BODY_TEXT_CHARS } from './lib/limits';

/**
 * Expand a single entry, by its zero-based index into log.entries, into its
 * full request, response, and timing breakdown. An out-of-range index
 * returns a structured error naming the valid range rather than a
 * truncated/empty entry. Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function getEntry(ax: AxiomContext, input: EntryIndexRequest): GetEntryResult {
  const parsed = parseHar(input.getText());
  const out = new GetEntryResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const index = input.getIndex();
  const n = parsed.entriesRaw.length;
  if (!Number.isInteger(index) || index < 0 || index >= n) {
    out.setOk(false);
    out.setError(n === 0 ? 'index out of range: document has 0 entries' : `index out of range: expected 0..${n - 1}, got ${index}`);
    return out;
  }

  out.setEntry(fullEntryToMsg(toFullEntry(parsed.entriesRaw[index], index, MAX_BODY_TEXT_CHARS)));
  return out;
}
