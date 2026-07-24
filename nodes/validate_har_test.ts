import { HarDocument } from '../gen/messages_pb';
import { validateHar } from './validate_har';
import { testContext } from './testdata/testContext';
import { VALID_HAR, MISSING_LOG_JSON, ENTRIES_NOT_ARRAY_JSON, NOT_JSON, deeplyNestedJson, oversizedText } from './testdata/fixtures';

describe('ValidateHar', () => {
  it('validates a schema-conformant HAR document as valid with no issues', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getValid()).toBe(true);
    expect(result.getIssuesList()).toHaveLength(0);
    expect(result.getHarVersion()).toBe('1.2');
  });

  // Independent oracle: this input is hand-constructed against the actual
  // HAR 1.2 JSON Schema (entry.json requires "request"; verified by reading
  // ahmadnassri/har-schema's lib/entry.json directly, not by trusting
  // whatever this node happens to report) — the expected violation is known
  // in advance, independent of ajv's output.
  it('flags a missing required "request" object on an entry, ok=true/valid=false', () => {
    const har = JSON.stringify({
      log: {
        version: '1.2',
        creator: { name: 'x', version: '1' },
        entries: [
          {
            startedDateTime: '2026-01-15T10:00:00.000Z',
            time: 1,
            // "request" deliberately omitted — required by entry.json.
            response: { status: 200, statusText: 'OK', httpVersion: 'HTTP/1.1', cookies: [], headers: [], content: { size: 0, mimeType: 'text/plain' }, redirectURL: '', headersSize: -1, bodySize: 0 },
            cache: {},
            timings: { send: 0, wait: 1, receive: 1 },
          },
        ],
      },
    });
    const input = new HarDocument();
    input.setText(har);
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getValid()).toBe(false);
    expect(result.getIssuesList().length).toBeGreaterThan(0);
    expect(result.getIssuesList().some((issue) => issue.includes('request'))).toBe(true);
  });

  it('flags a missing top-level "log" as a structural violation (not a hard parse error)', () => {
    const input = new HarDocument();
    input.setText(MISSING_LOG_JSON);
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getValid()).toBe(false);
    expect(result.getIssuesList().some((issue) => issue.toLowerCase().includes('log'))).toBe(true);
  });

  it('flags "entries" being the wrong type', () => {
    const input = new HarDocument();
    input.setText(ENTRIES_NOT_ARRAY_JSON);
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getValid()).toBe(false);
    expect(result.getIssuesList().length).toBeGreaterThan(0);
  });

  it('never runs validation on unparseable JSON — returns ok=false instead', () => {
    const input = new HarDocument();
    input.setText(NOT_JSON);
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/invalid JSON/);
    expect(result.getValid()).toBe(false);
    expect(result.getIssuesList()).toHaveLength(0);
  });

  it('rejects a document past the nesting-depth guard before validation runs', () => {
    const input = new HarDocument();
    input.setText(deeplyNestedJson(5000));
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/nesting/);
  });

  it('handles a large input without crashing (no payload-size limit)', () => {
    // No byte-size cap is imposed by this node -- the platform bounds
    // payload size, not this node. This particular large input is valid
    // JSON (a bare string), so parsing succeeds (ok=true); it's simply not
    // a schema-conformant HAR document (valid=false, with issues).
    const input = new HarDocument();
    input.setText(oversizedText(3_000_001));
    const result = validateHar(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getValid()).toBe(false);
    expect(result.getIssuesList().length).toBeGreaterThan(0);
  });

  it('is deterministic across repeated invocations', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const r1 = validateHar(testContext, input);
    const r2 = validateHar(testContext, input);
    expect(r1.getValid()).toBe(r2.getValid());
    expect(r1.getIssuesList()).toEqual(r2.getIssuesList());
  });
});
