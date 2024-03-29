/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string && size === undefined) return string;
  if (string && size === 0) return '';
  if (!string || !size) return '';
  if (size === 0) return '';

  let count = 0;
  const res = [];

  for (const char of string) {
    if (res[res.length - 1] === char) {
      if (count < size) {
        res.push(char);
        count++;
      }
    } else {
      count = 1;
      res.push(char);
    }
  }

  return res.join('');
}
