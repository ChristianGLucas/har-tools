import { HarDocument } from '../gen/messages_pb';
import { extractUrls } from './extract_urls';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT, harWithNEntries } from './testdata/fixtures';
import { MAX_ENTRIES_LIST } from './lib/limits';

describe('ExtractUrls', () => {
  it('extracts every request URL in entry order, correlated by index, not deduplicated', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractUrls(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(VALID_HAR_ENTRY_COUNT);
    expect(result.getTruncated()).toBe(false);
    const urls = result.getUrlsList();
    expect(urls[0].getIndex()).toBe(0);
    expect(urls[0].getUrl()).toBe('https://example.com/');
    expect(urls[3].getUrl()).toBe('https://api.example.com/submit');
  });

  it('truncates and flags a document with more entries than the cap (regression: this node used to silently drop entries beyond the cap with no signal)', () => {
    const input = new HarDocument();
    input.setText(harWithNEntries(MAX_ENTRIES_LIST + 5));
    const result = extractUrls(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getTruncated()).toBe(true);
    expect(result.getCount()).toBe(MAX_ENTRIES_LIST);
  });
});
