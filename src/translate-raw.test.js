import { describe, test, expect } from '@jest/globals';
import translateRawModule from './translate-raw.js';

describe('translate raw', () => {
  test('an input that has no translation available', async () => {
    const translate = translateRawModule.TranslateRaw({
      en: { HELLO: 'Hello' },
    });
    expect(await translate('en', 'GOODBYE')).toEqual([['GOODBYE']]);
  });

  test('an input without any replacements', async () => {
    const translate = translateRawModule.TranslateRaw({
      en: { HELLO: 'Hello' },
    });
    expect(await translate('en', 'HELLO')).toEqual([['Hello']]);
  });

  test('a nested key without any replacements', async () => {
    const translate = translateRawModule.TranslateRaw({
      en: { welcome: { HELLO: 'Hello' } },
    });
    expect(await translate('en', 'welcome.HELLO')).toEqual([['Hello']]);
  });

  test('an input with a prefix replacement', async () => {
    const translate = translateRawModule.TranslateRaw({
      en: { HELLO: '${name}, Hello' },
    });
    expect(await translate('en', 'HELLO', { name: 'Henk' })).toEqual([
      ['', ', Hello'],
      'Henk',
    ]);
  });

  test('an input with a postfix replacement', async () => {
    const translate = translateRawModule.TranslateRaw({
      en: { HELLO: 'Hello ${name}' },
    });
    expect(await translate('en', 'HELLO', { name: 'Henk' })).toEqual([
      ['Hello ', ''],
      'Henk',
    ]);
  });

  test('an input with a replacement in the middle', async () => {
    const translate = translateRawModule.TranslateRaw({
      en: { HELLO: 'Hello ${name}, how are you doing?' },
    });
    expect(await translate('en', 'HELLO', { name: 'Henk' })).toEqual([
      ['Hello ', ', how are you doing?'],
      'Henk',
    ]);
  });
});
