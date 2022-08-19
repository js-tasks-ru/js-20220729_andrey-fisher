/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  // контролируемый undefined на пустой аргумент, на пустую строку, на не-строку
  if (!(path && (typeof path === 'string'))) return; 
  
  const pathArr = path.split('.');
  if (pathArr.length == 0) return;

  return obj => {
    let result = obj;

    for (let i = 0; i < pathArr.length; i++) {
      if (result === undefined) break;

      result = result[pathArr[i]];
    }

    return result;
  }; 
}
