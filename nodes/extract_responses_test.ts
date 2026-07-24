import { HarDocument } from '../gen/messages_pb';
import { extractResponses } from './extract_responses';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT } from './testdata/fixtures';

describe('ExtractResponses', () => {
  it('extracts every response with status, headers, cookies, and content metadata', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractResponses(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(VALID_HAR_ENTRY_COUNT);

    const responses = result.getResponsesList();
    expect(responses[0].getStatus()).toBe(200);
    expect(responses[0].getContent()!.getMimeType()).toBe('text/html');
    expect(responses[0].getContent()!.getSize()).toBe(1500);
    expect(responses[0].getCookiesList()[0].getName()).toBe('session_id');
    expect(responses[0].getCookiesList()[0].getSecure()).toBe(true);
    expect(responses[0].getCookiesList()[0].getHttpOnly()).toBe(true);

    expect(responses[3].getStatus()).toBe(404);
    expect(responses[3].getStatusText()).toBe('Not Found');
  });

  it('returns a large response body in full, untruncated (no payload-size limit)', () => {
    const bigText = 'x'.repeat(25_000);
    const har = JSON.stringify({
      log: {
        version: '1.2',
        creator: { name: 'x', version: '1' },
        entries: [
          {
            startedDateTime: '2026-01-15T10:00:00.000Z',
            time: 1,
            request: { method: 'GET', url: 'https://example.com/big' },
            response: { status: 200, content: { mimeType: 'text/plain', size: bigText.length, text: bigText } },
            timings: { send: 0, wait: 1, receive: 1 },
          },
        ],
      },
    });
    const input = new HarDocument();
    input.setText(har);
    const result = extractResponses(testContext, input);
    expect(result.getOk()).toBe(true);
    const content = result.getResponsesList()[0].getContent()!;
    expect(content.getTextTruncated()).toBe(false);
    expect(content.getText().length).toBe(bigText.length);
  });
});
