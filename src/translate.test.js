import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import { Translate } from './translate.js';
import translateRawModule from './translate-raw.js';

describe('translate', () => {
  let translateRawSpy;
  beforeAll(() => {
    translateRawSpy = jest.fn();
    jest
      .spyOn(translateRawModule, 'TranslateRaw')
      .mockReturnValue(translateRawSpy);
  });

  test('combine an output with a single replacement', async () => {
    const translate = Translate({
      en: { HELLO: 'Hello' },
    });
    translateRawSpy.mockReturnValueOnce([['Hello '], 'Henk']);
    expect(await translate('unused', 'unused')).toEqual('Hello Henk');
  });
});
