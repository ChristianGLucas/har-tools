import { HarDocument } from '../gen/messages_pb';
import { extractUrls } from './extract_urls';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT, harWithNEntries } from './testdata/fixtures';

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

  it('extracts every URL with no truncation, even well beyond the old cap (no payload/result-count limit)', () => {
    const n = 3005;
    const input = new HarDocument();
    input.setText(harWithNEntries(n));
    const result = extractUrls(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getTruncated()).toBe(false);
    expect(result.getCount()).toBe(n);
  });
});
