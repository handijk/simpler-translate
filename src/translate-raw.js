export const TranslateRaw =
  (translations) =>
  async (language, key, replacements = {}) => {
    const result = key
      .toString()
      .split('.')
      .reduce((acc, curr) => acc[curr] ?? key, (await translations)[language])
      .toString();
    const strings = [];
    const keys = [];
    const regexp = RegExp(/\$\{(\w+)\}/g);
    let matches = regexp.exec(result);
    let index = 0;
    if (matches) {
      while (matches) {
        strings.push(result.slice(index, matches.index));
        index = matches.index + matches[0].length;
        keys.push(replacements[matches[1]]);
        matches = regexp.exec(result);
        if (!matches) {
          strings.push(result.slice(index));
        }
      }
    } else {
      strings.push(result);
    }
    return [strings, ...keys];
  };

export default { TranslateRaw };
