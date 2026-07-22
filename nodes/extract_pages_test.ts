import { HarDocument } from '../gen/messages_pb';
import { extractPages } from './extract_pages';
import { testContext } from './testdata/testContext';
import { VALID_HAR, EMPTY_ENTRIES_HAR } from './testdata/fixtures';

describe('ExtractPages', () => {
  it('extracts every declared page with id/title/timings', () => {
    const input = new HarDocument();
    input.setText(VALID_HAR);
    const result = extractPages(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1);
    const page = result.getPagesList()[0];
    expect(page.getId()).toBe('page_1');
    expect(page.getTitle()).toBe('Example Domain');
    expect(page.getOnContentLoad()).toBeCloseTo(150.0);
    expect(page.getOnLoad()).toBeCloseTo(320.5);
  });

  it('returns an empty (not error) list for a HAR with no pages array', () => {
    const input = new HarDocument();
    input.setText(EMPTY_ENTRIES_HAR);
    const result = extractPages(testContext, input);
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
    expect(result.getPagesList()).toHaveLength(0);
  });
});
