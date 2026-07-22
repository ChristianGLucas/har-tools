import { HeaderValueRequest } from '../gen/messages_pb';
import { detectHeaderPresence } from './detect_header_presence';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT } from './testdata/fixtures';

function run(headerName: string, direction = '') {
  const input = new HeaderValueRequest();
  input.setText(VALID_HAR);
  input.setHeaderName(headerName);
  input.setDirection(direction);
  return detectHeaderPresence(testContext, input);
}

describe('DetectHeaderPresence', () => {
  it('finds entries that carry a header at all, either side by default', () => {
    const result = run('Cache-Control');
    expect(result.getOk()).toBe(true);
    // present on entry0 (response) and entry1 (both) = 2 distinct entries
    expect(result.getCount()).toBe(2);
    expect(result.getTotalEntries()).toBe(VALID_HAR_ENTRY_COUNT);
    expect(result.getMatchesList().map((m) => m.getIndex()).sort()).toEqual([0, 1]);
  });

  it('restricts to request-only presence', () => {
    const result = run('Cache-Control', 'request');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1);
    expect(result.getMatchesList()[0].getIndex()).toBe(1);
  });

  it('returns zero matches for a header nothing carries', () => {
    const result = run('X-Not-Present');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
  });

  it('rejects an invalid direction with a structured error', () => {
    const result = run('Cache-Control', 'both-ish');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/invalid direction/);
  });
});
