import { HarDocument } from '../gen/messages_pb';
import { extractCookies } from './extract_cookies';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

describe('ExtractCookies', () => {
  it('extracts cookies SET by responses, correlated to entry index/url', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractCookies(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1); // only entry 0's response sets a cookie
    const c = result.getCookiesList()[0];
    expect(c.getIndex()).toBe(0);
    expect(c.getUrl()).toBe('https://example.com/');
    expect(c.getCookie()!.getName()).toBe('session_id');
    expect(c.getCookie()!.getValue()).toBe('abc123');
    expect(c.getCookie()!.getDomain()).toBe('example.com');
    expect(c.getCookie()!.getSecure()).toBe(true);
    expect(c.getCookie()!.getHttpOnly()).toBe(true);
    expect(c.getCookie()!.getExpires()).toBe('2027-01-01T00:00:00.000Z');
  });

  it('does not include request-carried cookies (only response-set cookies)', () => {
    // entry 3's REQUEST carries a session_id cookie, but its RESPONSE sets none.
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractCookies(testContext, input);
    expect(result.getCookiesList().some((c) => c.getIndex() === 3)).toBe(false);
  });
});
