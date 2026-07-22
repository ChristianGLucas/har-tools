import { HarDocument } from '../gen/messages_pb';
import { extractUrls } from './extract_urls';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT } from './testdata/fixtures';

describe('ExtractUrls', () => {
  it('extracts every request URL in entry order, correlated by index, not deduplicated', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractUrls(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(VALID_HAR_ENTRY_COUNT);
    const urls = result.getUrlsList();
    expect(urls[0].getIndex()).toBe(0);
    expect(urls[0].getUrl()).toBe('https://example.com/');
    expect(urls[3].getUrl()).toBe('https://api.example.com/submit');
  });
});
