import { HarDocument } from '../gen/messages_pb';
import { parseSummary } from './parse_summary';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT, MISSING_LOG_JSON, NOT_JSON, deeplyNestedJson, oversizedText } from './testdata/fixtures';

describe('ParseSummary', () => {
  it('extracts version/creator/browser/page/entry counts', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = parseSummary(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getHarVersion()).toBe('1.2');
    expect(result.getCreator()!.getName()).toBe('TestRecorder');
    expect(result.getCreator()!.getVersion()).toBe('9.1.0');
    expect(result.getBrowserName()).toBe('Chrome');
    expect(result.getBrowserVersion()).toBe('120.0.0.0');
    expect(result.getPageCount()).toBe(1);
    expect(result.getEntryCount()).toBe(VALID_HAR_ENTRY_COUNT);
  });

  it('rejects a document with no top-level "log" with a structured error', () => {
    const input = new HarDocument();
    input.setText(MISSING_LOG_JSON);
    const result = parseSummary(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/log/);
  });

  it('rejects invalid JSON with a structured error, not a crash', () => {
    const input = new HarDocument();
    input.setText(NOT_JSON);
    const result = parseSummary(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/invalid JSON/);
  });

  it('rejects a document past the nesting-depth guard', () => {
    const input = new HarDocument();
    input.setText(deeplyNestedJson(5000));
    const result = parseSummary(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/nesting/);
  });

  it('handles a large input without crashing (no payload-size limit)', () => {
    // No byte-size cap is imposed by this node -- the platform bounds
    // payload size, not this node. This particular large input is a bare
    // JSON string (not a HAR object), so it's still ok=false, but via the
    // ordinary "not a HAR document" structural check, not a size guard.
    const input = new HarDocument();
    input.setText(oversizedText(3_000_001));
    const result = parseSummary(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/not a HAR document/);
  });

  it('is deterministic across repeated invocations', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const r1 = parseSummary(testContext, input);
    const r2 = parseSummary(testContext, input);
    expect(r1.getEntryCount()).toBe(r2.getEntryCount());
    expect(r1.getHarVersion()).toBe(r2.getHarVersion());
  });
});
