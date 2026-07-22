import { TopNRequest } from '../gen/messages_pb';
import { extractSlowest } from './extract_slowest';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

function run(limit: number, sortBy: string) {
  const input = new TopNRequest();
  input.setText(VALID_HAR);
  input.setLimit(limit);
  input.setSortBy(sortBy);
  return extractSlowest(testContext, input);
}

describe('ExtractSlowest', () => {
  it('ranks by time descending by default', () => {
    const result = run(2, '');
    expect(result.getOk()).toBe(true);
    const entries = result.getEntriesList();
    expect(entries).toHaveLength(2);
    expect(entries[0].getIndex()).toBe(3); // 200.7
    expect(entries[1].getIndex()).toBe(0); // 120.5
  });

  it('ranks by response content size when sort_by=size', () => {
    const result = run(1, 'size');
    expect(result.getOk()).toBe(true);
    expect(result.getEntriesList()[0].getIndex()).toBe(2); // logo.png, size 2048
  });

  it('defaults limit to 10 when <= 0', () => {
    const result = run(0, 'time');
    expect(result.getOk()).toBe(true);
    expect(result.getEntriesList()).toHaveLength(4); // only 4 entries exist
  });

  it('rejects an invalid sort_by with a structured error', () => {
    const result = run(5, 'popularity');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/invalid sort_by/);
  });
});
