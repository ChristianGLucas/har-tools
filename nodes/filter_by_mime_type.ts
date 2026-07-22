import { MimeTypeFilterRequest, ListEntriesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseHar, buildFilterRows } from './lib/harParse';
import { entrySummaryToMsg } from './lib/mappers';
import { MAX_ENTRIES_LIST } from './lib/limits';

/**
 * Return only entries whose response content.mimeType matches mime_type — a
 * trailing-slash value ("image/") matches the whole family
 * case-insensitively, any other value must match the full type exactly
 * (e.g. "application/json"). An empty mime_type returns a structured error.
 * Deterministic (entry order); never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function filterByMimeType(ax: AxiomContext, input: MimeTypeFilterRequest): ListEntriesResult {
  const parsed = parseHar(input.getText());
  const out = new ListEntriesResult();
  out.setOk(parsed.ok);
  out.setError(parsed.error);
  if (!parsed.ok) return out;

  const rawFilter = input.getMimeType().trim();
  if (rawFilter.length === 0) {
    out.setOk(false);
    out.setError('mime_type must not be empty');
    return out;
  }
  const isFamily = rawFilter.endsWith('/');
  const filter = rawFilter.toLowerCase();

  const { rows, truncated } = buildFilterRows(parsed.entriesRaw, MAX_ENTRIES_LIST);
  const matched = rows
    .filter((r) => {
      const mt = r.mimeType.toLowerCase();
      return isFamily ? mt.startsWith(filter) : mt === filter;
    })
    .map((r) => entrySummaryToMsg(r.summary));
  out.setEntriesList(matched);
  out.setCount(matched.length);
  out.setTruncated(truncated);
  return out;
}
