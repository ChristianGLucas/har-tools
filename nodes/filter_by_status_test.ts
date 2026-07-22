import { StatusFilterRequest } from '../gen/messages_pb';
import { filterByStatus } from './filter_by_status';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

function run(statusFilter: string) {
  const input = new StatusFilterRequest();
  input.setText(VALID_HAR);
  input.setStatusFilter(statusFilter);
  return filterByStatus(testContext, input);
}

describe('FilterByStatus', () => {
  it('matches an exact 3-digit status code', () => {
    const result = run('404');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1);
    expect(result.getEntriesList()[0].getUrl()).toBe('https://api.example.com/submit');
  });

  it('matches a status-class shorthand', () => {
    const result = run('2xx');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(3);
  });

  it('the error-finding case: 4xx isolates the failing entry', () => {
    const result = run('4xx');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1);
    expect(result.getEntriesList()[0].getStatus()).toBe(404);
  });

  it('returns an empty match set for a class with no entries', () => {
    const result = run('5xx');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
  });

  it('rejects an invalid status_filter with a structured error', () => {
    const result = run('not-a-status');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/invalid status_filter/);
  });
});
