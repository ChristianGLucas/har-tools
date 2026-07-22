import { HarDocument, ParseSummaryResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toCreator } from './lib/harParse';
import { creatorToMsg } from './lib/mappers';

/**
 * Parse a HAR document's top-level metadata without expanding every entry:
 * the declared HAR version, log.creator (name/version), log.browser
 * (name/version, when present), page count, and entry count. The fast first
 * call to characterize an unfamiliar capture. Deterministic; never throws —
 * a malformed, oversized, or non-HAR document returns ok=false with a
 * structured error.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parseSummary(ax: AxiomContext, input: HarDocument): ParseSummaryResult {
  const parsed = parseHar(input.getText());
  const out = new ParseSummaryResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const log = parsed.log;
  out.setHarVersion(typeof log.version === 'string' ? log.version : '');
  out.setCreator(creatorToMsg(toCreator(log.creator)));
  const browser = toCreator(log.browser);
  out.setBrowserName(browser.name);
  out.setBrowserVersion(browser.version);
  out.setPageCount(Array.isArray(log.pages) ? log.pages.length : 0);
  out.setEntryCount(parsed.entriesRaw.length);
  return out;
}
