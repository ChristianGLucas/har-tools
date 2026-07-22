import { HarDocument } from '../gen/messages_pb';
import { listEntries } from './list_entries';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT, EMPTY_ENTRIES_HAR, harWithNEntries } from './testdata/fixtures';
import { MAX_ENTRIES_LIST } from './lib/limits';

describe('ListEntries', () => {
  it('lists every entry as a summary in entry order', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = listEntries(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(VALID_HAR_ENTRY_COUNT);
    expect(result.getTruncated()).toBe(false);
    const entries = result.getEntriesList();
    expect(entries[0].getMethod()).toBe('GET');
    expect(entries[0].getUrl()).toBe('https://example.com/');
    expect(entries[0].getStatus()).toBe(200);
    expect(entries[0].getTime()).toBeCloseTo(120.5);
    expect(entries[3].getMethod()).toBe('POST');
    expect(entries[3].getStatus()).toBe(404);
    entries.forEach((e, i) => expect(e.getIndex()).toBe(i));
  });

  it('returns an empty list (not an error) for a HAR with zero entries', () => {
    const input = new HarDocument();
    input.setText(EMPTY_ENTRIES_HAR);
    const result = listEntries(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
    expect(result.getEntriesList()).toHaveLength(0);
  });

  it('truncates and flags a document with more entries than the cap', () => {
    const input = new HarDocument();
    input.setText(harWithNEntries(MAX_ENTRIES_LIST + 5));
    const result = listEntries(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getTruncated()).toBe(true);
    expect(result.getCount()).toBe(MAX_ENTRIES_LIST);
  });
});
