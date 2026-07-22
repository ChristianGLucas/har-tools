// Input-surface bounds shared by every node. Kept generous enough for real
// captures (a busy page load can legitimately produce hundreds of entries;
// long sessions/HAR-based load tests can produce thousands) but well clear
// of Axiom's ~4 MiB node transport cap on both input and output.

// Raw HAR text, in bytes (UTF-8).
export const MAX_TEXT_BYTES = 3_000_000;

// Pre-parse JSON nesting-depth guard. V8's JSON.parse recursion on
// pathologically deep input can exhaust the call stack; this bound is
// checked with a linear scan BEFORE JSON.parse ever runs, so it can't be
// bypassed by the parser itself.
export const MAX_NESTING_DEPTH = 1000;

// Entries scanned/returned by lightweight (summary-shaped) nodes: ListEntries,
// ExtractTimings, ExtractUrls, ExtractDomains, ComputeStats, ExtractCookies,
// ExtractHeaderValues, DetectHeaderPresence, and the three filter nodes. A
// document with more entries than this is not rejected — the scan simply
// stops here and the result carries `truncated: true`.
export const MAX_ENTRIES_LIST = 3000;

// Entries returned by the heavier full-detail nodes (ExtractRequests,
// ExtractResponses), which emit headers/cookies/body previews per entry and
// so cost much more output per entry than a summary.
export const MAX_ENTRIES_DETAIL = 500;

// Per-field text preview cap for a response body (ContentInfo.text) or a
// request body (PostDataInfo.text) — HAR bodies can be large or
// base64-encoded binary; previews beyond this are truncated with
// `text_truncated: true` rather than shipped whole.
export const MAX_BODY_TEXT_CHARS = 20_000;

// Bounds on TopNRequest.limit (ExtractSlowest).
export const DEFAULT_TOP_N = 10;
export const MAX_TOP_N = 1000;

export function byteLength(text: string): number {
  return Buffer.byteLength(text, 'utf8');
}
