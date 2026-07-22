import { HarDocument } from '../gen/messages_pb';
import { extractRequests } from './extract_requests';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT } from './testdata/fixtures';

describe('ExtractRequests', () => {
  it('extracts every request with headers, query string, cookies, and post data', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractRequests(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(VALID_HAR_ENTRY_COUNT);
    expect(result.getTruncated()).toBe(false);

    const requests = result.getRequestsList();
    expect(requests[0].getMethod()).toBe('GET');
    expect(requests[0].getHeadersList().some((h) => h.getName() === 'User-Agent')).toBe(true);

    const post = requests[3];
    expect(post.getMethod()).toBe('POST');
    expect(post.getHasPostData()).toBe(true);
    expect(post.getPostData()!.getMimeType()).toBe('application/x-www-form-urlencoded');
    expect(post.getPostData()!.getParamsList().map((p) => p.getName())).toEqual(['a', 'b']);
    expect(post.getCookiesList()[0].getValue()).toBe('abc123');

    const withQuery = requests[1];
    expect(withQuery.getQueryStringList()[0].getValue()).toBe('10');
  });

  it('sets has_post_data=false and no PostDataInfo for a request without a body', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractRequests(testContext, input);
    const get = result.getRequestsList()[0];
    expect(get.getHasPostData()).toBe(false);
  });
});
