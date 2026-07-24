import { HeaderValueRequest, ExtractHeaderValuesResult, HeaderValueEntry } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, parseDirection, findHeaderOccurrences } from './lib/harParse';

/**
 * Extract every value of one named header (case-insensitive, e.g.
 * "Cache-Control") across every entry's request and/or response headers
 * (direction: "request" | "response" | "" for both), correlated back to the
 * entry index and which side it was found on. An entry with the header
 * repeated emits one value per occurrence. Deterministic (entry order,
 * request before response per entry); never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractHeaderValues(ax: AxiomContext, input: HeaderValueRequest): ExtractHeaderValuesResult {
  const parsed = parseHar(input.getText());
  const out = new ExtractHeaderValuesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const headerName = input.getHeaderName().trim();
  if (headerName.length === 0) {
    out.setOk(false);
    out.setError('header_name must not be empty');
    return out;
  }
  const dir = parseDirection(input.getDirection());
  if (!dir.ok) {
    out.setOk(false);
    out.setError(dir.error);
    return out;
  }

  const headerNameLower = headerName.toLowerCase();
  const values: HeaderValueEntry[] = [];
  parsed.entriesRaw.forEach((eRaw, i) => {
    for (const occ of findHeaderOccurrences(eRaw, headerNameLower, dir)) {
      const m = new HeaderValueEntry();
      m.setIndex(i);
      m.setDirection(occ.direction);
      m.setValue(occ.value);
      values.push(m);
    }
  });

  out.setValuesList(values);
  out.setCount(values.length);
  return out;
}
