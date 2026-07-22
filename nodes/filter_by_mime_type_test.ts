import { MimeTypeFilterRequest } from '../gen/messages_pb';
import { filterByMimeType } from './filter_by_mime_type';
import { testContext } from './testdata/testContext';
import { VALID_HAR } from './testdata/fixtures';

function run(mimeType: string) {
  const input = new MimeTypeFilterRequest();
  input.setText(VALID_HAR);
  input.setMimeType(mimeType);
  return filterByMimeType(testContext, input);
}

describe('FilterByMimeType', () => {
  it('matches an exact MIME type case-insensitively', () => {
    const result = run('APPLICATION/JSON');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1);
    expect(result.getEntriesList()[0].getUrl()).toContain('data.json');
  });

  it('matches a whole family via a trailing slash', () => {
    const result = run('image/');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(1);
    expect(result.getEntriesList()[0].getUrl()).toContain('logo.png');
  });

  it('an exact filter does not match a different family sharing no prefix', () => {
    const result = run('text/css');
    expect(result.getOk()).toBe(true);
    expect(result.getCount()).toBe(0);
  });

  it('rejects an empty mime_type with a structured error', () => {
    const result = run('');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toMatch(/must not be empty/);
  });
});
