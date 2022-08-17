import translateRawModule from './translate-raw.js';

export const Translate = (translations) => {
  const translate = translateRawModule.TranslateRaw(translations);
  return async (...args) => {
    const [strings, ...keys] = await translate(...args);
    return keys
      .reduce((acc, curr, i) => [...acc, curr, strings[i + 1]], [strings[0]])
      .join('');
  };
};

