import { HarDocument, ExtractPagesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toPage } from './lib/harParse';
import { pageToMsg } from './lib/mappers';

/**
 * Extract every log.pages[] entry: id, title, start time, and page timings
 * (onContentLoad/onLoad, milliseconds from page start, HAR's -1 sentinel
 * when not recorded). Empty (not an error) for a HAR with no page
 * grouping. Deterministic (declared order); never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractPages(ax: AxiomContext, input: HarDocument): ExtractPagesResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractPagesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const pagesRaw = Array.isArray(parsed.log.pages) ? (parsed.log.pages as unknown[]) : [];
  const pages = pagesRaw.map((p) => pageToMsg(toPage(p)));
  out.setPagesList(pages);
  out.setCount(pages.length);
  return out;
}
