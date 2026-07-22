import { EntryIndexRequest } from '../gen/messages_pb';
import { getEntry } from './get_entry';
import { testContext } from './testdata/testContext';
import { VALID_HAR, EMPTY_ENTRIES_HAR } from './testdata/fixtures';

describe('GetEntry', () => {
  it('expands a request/response/timings for a valid index', () => {
    const input = new EntryIndexRequest();
    input.setText(VALID_HAR);
    input.setIndex(3);
    const result = getEntry(testContext, input);
    expect(result.getOk()).toBe(true);
    const entry = result.getEntry()!;
    expect(entry.getIndex()).toBe(3);
    expect(entry.getRequest()!.getMethod()).toBe('POST');
    expect(entry.getRequest()!.getUrl()).toBe('https://api.example.com/submit');
    expect(entry.getRequest()!.getHasPostData()).toBe(true);
    expect(entry.getRequest()!.getPostData()!.getText()).toBe('a=1&b=2');
    expect(entry.getRequest()!.getPostData()!.getParamsList()).toHaveLength(2);
    expect(entry.getRequest()!.getCookiesList()[0].getName()).toBe('session_id');
    expect(entry.getResponse()!.getStatus()).toBe(404);
    expect(entry.getTimings()!.getWait()).toBeCloseTo(150);
    expect(entry.getTimings()!.getBlocked()).toBeCloseTo(2);
  });

  it('returns request headers and query string for another entry', () => {
    const input = new EntryIndexRequest();
    input.setText(VALID_HAR);
    input.setIndex(1);
    const result = getEntry(testContext, input);
    expect(result.getOk()).toBe(true);
    const entry = result.getEntry()!;
    expect(entry.getRequest()!.getQueryStringList()).toHaveLength(1);
    expect(entry.getRequest()!.getQueryStringList()[0].getName()).toBe('limit');
    expect(entry.getRequest()!.getHeadersList().some((h) => h.getName() === 'Cache-Control' && h.getValue() === 'no-cache')).toBe(true);
    expect(entry.getResponse()!.getContent()!.getMimeType()).toBe('application/json');
    // -1 sentinel read verbatim, not computed
    expect(entry.getTimings()!.getBlocked()).toBe(-1);
  });

  it('returns a structured error for an out-of-range index', () => {
    const input = new EntryIndexRequest();
    input.setText(VALID_HAR);
    input.setIndex(99);
    const result = getEntry(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/out of range/);
  });

  it('returns a structured error for a negative index', () => {
    const input = new EntryIndexRequest();
    input.setText(VALID_HAR);
    input.setIndex(-1);
    const result = getEntry(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/out of range/);
  });

  it('names the entry count in the error for a zero-entry document', () => {
    const input = new EntryIndexRequest();
    input.setText(EMPTY_ENTRIES_HAR);
    input.setIndex(0);
    const result = getEntry(testContext, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/0 entries/);
  });
});
