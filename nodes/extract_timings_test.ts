import { HarDocument } from '../gen/messages_pb';
import { extractTimings } from './extract_timings';
import { testContext } from './testdata/testContext';
import { VALID_HAR, VALID_HAR_ENTRY_COUNT } from './testdata/fixtures';

describe('ExtractTimings', () => {
  it('extracts the timing breakdown for every entry, correlated by index and URL', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractTimings(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(VALID_HAR_ENTRY_COUNT);

    const t0 = result.getTimingsList()[0];
    expect(t0.getUrl()).toBe('https://example.com/');
    expect(t0.getTimings()!.getBlocked()).toBeCloseTo(1.5);
    expect(t0.getTimings()!.getDns()).toBeCloseTo(2.3);
    expect(t0.getTimings()!.getConnect()).toBeCloseTo(5.0);
    expect(t0.getTimings()!.getSsl()).toBeCloseTo(3.0);
    expect(t0.getTimings()!.getSend()).toBeCloseTo(0.5);
    expect(t0.getTimings()!.getWait()).toBeCloseTo(100.0);
    expect(t0.getTimings()!.getReceive()).toBeCloseTo(11.2);
  });

  it('reads HAR -1 "not applicable" sentinels verbatim, never computing a substitute', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractTimings(testContext, input);
    const t1 = result.getTimingsList()[1];
    expect(t1.getTimings()!.getBlocked()).toBe(-1);
    expect(t1.getTimings()!.getDns()).toBe(-1);
    expect(t1.getTimings()!.getConnect()).toBe(-1);
    expect(t1.getTimings()!.getSsl()).toBe(-1);
  });
});
