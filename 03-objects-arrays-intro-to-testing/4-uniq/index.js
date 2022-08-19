/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (!arr || arr.length === 0) return [];
  const res = new Map();
  
  for (const item of arr) {
    if (!res.has(item)) {
      res.set(item, null);
    }
  }
  
  return Array.from( res.keys() ); 
}
