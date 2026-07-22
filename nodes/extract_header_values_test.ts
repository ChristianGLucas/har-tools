import { HeaderValueRequest } from '../gen/messages_pb';
import { extractHeaderValues } from './extract_header_values';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

function run(headerName: string, direction = '') {
  const input = new HeaderValueRequest();
  input.setText(VALID_HAR);
  input.setHeaderName(headerName);
  input.setDirection(direction);
  return extractHeaderValues(testContext, input);
}

describe('ExtractHeaderValues', () => {
  it('extracts every value of a header across request and response by default', () => {
    const result = run('Cache-Control');
    expect(result.getOk()).toBe(true);
    // entry0 response, entry1 request, entry1 response = 3 occurrences
    expect(result.getCount()).toBe(3);
    const dirs = result.getValuesList().map((v) => v.getDirection());
    expect(dirs.filter((d) => d === 'request')).toHaveLength(1);
    expect(dirs.filter((d) => d === 'response')).toHaveLength(2);
  });

  it('is case-insensitive on the header name', () => {
    const result = run('cache-control');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(3);
  });

  it('restricts to one direction when requested', () => {
    const result = run('Cache-Control', 'response');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(2);
    expect(result.getValuesList().every((v) => v.getDirection() === 'response')).toBe(true);
  });

  it('returns zero matches (not an error) for a header nothing sets', () => {
    const result = run('X-Nonexistent-Header');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
  });

  it('rejects an empty header_name with a structured error', () => {
    const result = run('');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/must not be empty/);
  });

  it('rejects an invalid direction with a structured error', () => {
    const result = run('Cache-Control', 'sideways');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/invalid direction/);
  });
});
