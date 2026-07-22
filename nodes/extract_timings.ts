import { HarDocument, ExtractTimingsResult, EntryTimings } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, toTimings } from './lib/harParse';
import { timingsToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST } from './lib/limits';

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

/**
 * The core performance node: extract the HAR `timings` breakdown
 * (blocked/dns/connect/send/wait/receive/ssl, in milliseconds) for every
 * entry, correlated back to its index and URL. Values are read verbatim,
 * including HAR's -1 "not applicable" sentinel — never computed or
 * re-derived. Capped at 3000 entries; `truncated` signals a larger
 * document. Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractTimings(ax: AxiomContext, input: HarDocument): ExtractTimingsResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractTimingsResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const truncated = parsed.entriesRaw.length > MAX_ENTRIES_LIST;
  const slice = parsed.entriesRaw.slice(0, MAX_ENTRIES_LIST);
  const timings = slice.map((eRaw, i) => {
    const e = (eRaw ?? {}) as Record<string, unknown>;
    const req = (e.request ?? {}) as Record<string, unknown>;
    const m = new EntryTimings();
    m.setIndex(i);
    m.setUrl(str(req.url));
    m.setTimings(timingsToMsg(toTimings(eRaw)));
    return m;
  });
  out.setTimingsList(timings);
  out.setCount(timings.length);
  out.setTruncated(truncated);
  return out;
}
