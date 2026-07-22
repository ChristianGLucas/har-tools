// Shared test fixtures. VALID_HAR is schema-conformant (validated against
// the actual ahmadnassri/har-schema definitions, not just eyeballed) so it
// doubles as the fixture for ValidateHar's happy path and for every
// extraction node's real-shape test.

function entry(opts: {
  startedDateTime: string;
  time: number;
  method: string;
  url: string;
  requestHeaders?: Array<{ name: string; value: string }>;
  queryString?: Array<{ name: string; value: string }>;
  requestCookies?: Array<Record<string, unknown>>;
  postData?: Record<string, unknown>;
  status: number;
  statusText: string;
  responseHeaders?: Array<{ name: string; value: string }>;
  responseCookies?: Array<Record<string, unknown>>;
  mimeType: string;
  size: number;
  redirectURL?: string;
  timings: { blocked?: number; dns?: number; connect?: number; ssl?: number; send: number; wait: number; receive: number };
  pageref?: string;
  serverIPAddress?: string;
}) {
  return {
    pageref: opts.pageref,
    startedDateTime: opts.startedDateTime,
    time: opts.time,
    request: {
      method: opts.method,
      url: opts.url,
      httpVersion: 'HTTP/1.1',
      cookies: opts.requestCookies ?? [],
      headers: opts.requestHeaders ?? [],
      queryString: opts.queryString ?? [],
      postData: opts.postData,
      headersSize: -1,
      bodySize: -1,
    },
    response: {
      status: opts.status,
      statusText: opts.statusText,
      httpVersion: 'HTTP/1.1',
      cookies: opts.responseCookies ?? [],
      headers: opts.responseHeaders ?? [],
      content: { size: opts.size, mimeType: opts.mimeType, compression: 0 },
      redirectURL: opts.redirectURL ?? '',
      headersSize: -1,
      bodySize: opts.size,
    },
    cache: {},
    timings: opts.timings,
    serverIPAddress: opts.serverIPAddress ?? '93.184.216.34',
  };
}

const VALID_HAR_OBJ = {
  log: {
    version: '1.2',
    creator: { name: 'TestRecorder', version: '9.1.0' },
    browser: { name: 'Chrome', version: '120.0.0.0' },
    pages: [
      {
        startedDateTime: '2026-01-15T10:00:00.000Z',
        id: 'page_1',
        title: 'Example Domain',
        pageTimings: { onContentLoad: 150.0, onLoad: 320.5 },
      },
    ],
    entries: [
      entry({
        pageref: 'page_1',
        startedDateTime: '2026-01-15T10:00:00.100Z',
        time: 120.5,
        method: 'GET',
        url: 'https://example.com/',
        requestHeaders: [
          { name: 'User-Agent', value: 'Mozilla/5.0 TestAgent' },
          { name: 'Accept', value: 'text/html' },
        ],
        status: 200,
        statusText: 'OK',
        responseHeaders: [
          { name: 'Content-Type', value: 'text/html; charset=utf-8' },
          { name: 'Cache-Control', value: 'max-age=3600' },
        ],
        responseCookies: [
          {
            name: 'session_id',
            value: 'abc123',
            domain: 'example.com',
            path: '/',
            expires: '2027-01-01T00:00:00.000Z',
            httpOnly: true,
            secure: true,
          },
        ],
        mimeType: 'text/html',
        size: 1500,
        timings: { blocked: 1.5, dns: 2.3, connect: 5.0, ssl: 3.0, send: 0.5, wait: 100.0, receive: 11.2 },
      }),
      entry({
        pageref: 'page_1',
        startedDateTime: '2026-01-15T10:00:00.300Z',
        time: 45.2,
        method: 'GET',
        url: 'https://api.example.com/data.json?limit=10',
        requestHeaders: [
          { name: 'Accept', value: 'application/json' },
          { name: 'Cache-Control', value: 'no-cache' },
        ],
        queryString: [{ name: 'limit', value: '10' }],
        status: 200,
        statusText: 'OK',
        responseHeaders: [
          { name: 'Content-Type', value: 'application/json' },
          { name: 'Cache-Control', value: 'no-cache' },
        ],
        mimeType: 'application/json',
        size: 256,
        timings: { blocked: -1, dns: -1, connect: -1, ssl: -1, send: 1, wait: 40, receive: 4.2 },
      }),
      entry({
        pageref: 'page_1',
        startedDateTime: '2026-01-15T10:00:00.400Z',
        time: 30.0,
        method: 'GET',
        url: 'https://example.com/img/logo.png',
        requestHeaders: [{ name: 'Accept', value: 'image/png' }],
        status: 200,
        statusText: 'OK',
        responseHeaders: [{ name: 'Content-Type', value: 'image/png' }],
        mimeType: 'image/png',
        size: 2048,
        timings: { blocked: -1, dns: -1, connect: -1, ssl: -1, send: 0.2, wait: 25, receive: 4.8 },
      }),
      entry({
        pageref: 'page_1',
        startedDateTime: '2026-01-15T10:00:00.500Z',
        time: 200.7,
        method: 'POST',
        url: 'https://api.example.com/submit',
        requestHeaders: [{ name: 'Content-Type', value: 'application/x-www-form-urlencoded' }],
        requestCookies: [{ name: 'session_id', value: 'abc123' }],
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          text: 'a=1&b=2',
          params: [
            { name: 'a', value: '1' },
            { name: 'b', value: '2' },
          ],
        },
        status: 404,
        statusText: 'Not Found',
        responseHeaders: [{ name: 'Content-Type', value: 'text/plain' }],
        mimeType: 'text/plain',
        size: 64,
        timings: { blocked: 2, dns: 3, connect: 10, ssl: 8, send: 5, wait: 150, receive: 22.7 },
      }),
    ],
  },
};

export const VALID_HAR = JSON.stringify(VALID_HAR_OBJ);
export const VALID_HAR_ENTRY_COUNT = VALID_HAR_OBJ.log.entries.length;

// Schema-valid HAR with zero entries (an empty capture) — entries is
// required to be an array, not required to be non-empty.
export const EMPTY_ENTRIES_HAR = JSON.stringify({
  log: { version: '1.2', creator: { name: 'TestRecorder', version: '9.1.0' }, entries: [] },
});

// Well-formed JSON, but not a HAR document at all (no top-level "log").
export const MISSING_LOG_JSON = JSON.stringify({ foo: 'bar' });

// A "log" present, but "entries" is the wrong type — a real
// structural-violation case for ValidateHar; a hard parse failure for every
// other node.
export const ENTRIES_NOT_ARRAY_JSON = JSON.stringify({
  log: { version: '1.2', creator: { name: 'x', version: '1' }, entries: 'oops' },
});

export const NOT_JSON = '{not: valid json,,,';

export function deeplyNestedJson(depth: number): string {
  return '['.repeat(depth) + ']'.repeat(depth);
}

export function oversizedText(byteLen: number): string {
  // Wrap in a JSON string literal so it's syntactically valid JSON (the byte
  // guard must fire before JSON.parse is ever invoked either way).
  return '"' + 'a'.repeat(Math.max(0, byteLen - 2)) + '"';
}

// A HAR with more entries than a given cap, for truncation tests. Entries
// are intentionally minimal (not full har-schema-conformant) — these tests
// exercise extraction/truncation logic, not ValidateHar.
export function harWithNEntries(n: number): string {
  const entries = [];
  for (let i = 0; i < n; i++) {
    entries.push({
      startedDateTime: '2026-01-15T10:00:00.000Z',
      time: i,
      request: { method: 'GET', url: `https://example.com/${i}` },
      response: { status: 200, content: { mimeType: 'text/plain', size: 10 } },
      timings: { send: 0, wait: 1, receive: 1 },
    });
  }
  return JSON.stringify({ log: { version: '1.2', creator: { name: 'x', version: '1' }, entries } });
}
