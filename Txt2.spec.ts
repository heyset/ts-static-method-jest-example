import { promises as fs } from 'fs';
import { afterEach, beforeEach, describe, it, expect, jest } from '@jest/globals';
import mockfs from 'mock-fs';
import { Quote } from './Quote';
import { Txt } from './Txt';

jest.mock('./Quote');
Quote.merge = (_firstQuote: Quote, _secondQuote: Quote) => {
  return { author: 'The Queen ft. The King', content: 'Check. Also, mate.' }
} // static methods can just be reassigned like this
// they can also be used in mock files

describe('exportMerged', () => {
  beforeEach(() => {
    mockfs();
  });

  afterEach(() => {
    mockfs.restore();
  });

  it('exports the quotes after merging them', async () => {
    const testTxt = new Txt();
    testTxt.addQuote(new Quote());
    testTxt.addQuote(new Quote());

    await testTxt.exportMergedQuotes('my-quotes');
    const exportedFileContent = await fs.readFile('./my-quotes.txt', 'utf-8');
    expect(exportedFileContent).toBe('The Queen ft. The King - Check. Also, mate.');
  });
});
