// Shared bounds. Payload/result size is the platform's job, not this
// package's — the only bound kept here is a genuine stack-overflow guard.

// Pre-parse JSON nesting-depth guard. V8's JSON.parse recursion on
// pathologically deep input can exhaust the call stack; this bound is
// checked with a linear scan BEFORE JSON.parse ever runs, so it can't be
// bypassed by the parser itself.
export const MAX_NESTING_DEPTH = 1000;

// Default for TopNRequest.limit when unset/non-positive (ExtractSlowest).
export const DEFAULT_TOP_N = 10;

export function byteLength(text: string): number {
  return Buffer.byteLength(text, 'utf8');
}
