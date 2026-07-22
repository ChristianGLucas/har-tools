import { HarDocument } from '../gen/messages_pb';
import { computeStats } from './compute_stats';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT } from './testdata/fixtures';

describe('ComputeStats', () => {
  it('aggregates entry count, transfer size, total time, status/mime breakdowns, and slowest', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = computeStats(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getEntryCount()).toBe(VALID_HAR_ENTRY_COUNT);
    // 1500 + 256 + 2048 + 64
    expect(result.getTotalTransferSize()).toBe(3868);
    // 120.5 + 45.2 + 30.0 + 200.7
    expect(result.getTotalTime()).toBeCloseTo(396.4);

    const byStatus = new Map(result.getCountByStatusClassList().map((c) => [c.getKey(), c.getCount()]));
    expect(byStatus.get('2xx')).toBe(3);
    expect(byStatus.get('4xx')).toBe(1);

    const byMime = new Map(result.getCountByMimeTypeList().map((c) => [c.getKey(), c.getCount()]));
    expect(byMime.get('text/html')).toBe(1);
    expect(byMime.get('application/json')).toBe(1);
    expect(byMime.get('image/png')).toBe(1);
    expect(byMime.get('text/plain')).toBe(1);

    const slowest = result.getSlowestList();
    expect(slowest).toHaveLength(3);
    expect(slowest[0].getTime()).toBeCloseTo(200.7); // submit, index 3
    expect(slowest[1].getTime()).toBeCloseTo(120.5); // /, index 0
    expect(slowest[2].getTime()).toBeCloseTo(45.2); // data.json, index 1
  });

  it('is deterministic across repeated invocations', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const r1 = computeStats(testContext, input);
    const r2 = computeStats(testContext, input);
    expect(r1.getTotalTransferSize()).toBe(r2.getTotalTransferSize());
    expect(r1.getSlowestList().map((s) => s.getIndex())).toEqual(r2.getSlowestList().map((s) => s.getIndex()));
  });
});
