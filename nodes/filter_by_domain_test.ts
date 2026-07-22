import { DomainFilterRequest } from '../gen/messages_pb';
import { filterByDomain } from './filter_by_domain';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

function run(domain: string) {
  const input = new DomainFilterRequest();
  input.setText(VALID_HAR);
  input.setDomain(domain);
  return filterByDomain(testContext, input);
}

describe('FilterByDomain', () => {
  it('matches an exact host, case-insensitively', () => {
    const result = run('API.EXAMPLE.COM');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(2);
  });

  it('does not subdomain-expand or wildcard', () => {
    const result = run('example.com');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(2); // / and logo.png — not api.example.com's 2
    for (const e of result.getEntriesList()) {
      expect(new URL(e.getUrl()).hostname).toBe('example.com');
    }
  });

  it('rejects an empty domain with a structured error', () => {
    const result = run('');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/must not be empty/);
  });
});
