import { HarDocument } from '../gen/messages_pb';
import { extractDomains } from './extract_domains';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

describe('ExtractDomains', () => {
  it('lists every distinct host with its entry count, sorted alphabetically', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractDomains(testContext, input);
    expect(result.getOk()).toBe(true);
    const domains = result.getDomainsList();
    expect(domains.map((d) => d.getDomain())).toEqual(['api.example.com', 'example.com']);
    expect(domains[0].getCount()).toBe(2); // data.json + submit
    expect(domains[1].getCount()).toBe(2); // / + logo.png
    expect(result.getCount()).toBe(2);
  });

  it('skips an entry with a malformed request URL rather than failing', () => {
    const har = JSON.stringify({
      log: {
        version: '1.2',
        creator: { name: 'x', version: '1' },
        entries: [
          {
            startedDateTime: '2026-01-15T10:00:00.000Z',
            time: 1,
            request: { method: 'GET', url: 'not a valid url::::' },
            response: { status: 200, content: { mimeType: 'text/plain' } },
            timings: { send: 0, wait: 1, receive: 1 },
          },
        ],
      },
    });
    const input = new HarDocument();
    input.setText(har);
    const result = extractDomains(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
  });
});
