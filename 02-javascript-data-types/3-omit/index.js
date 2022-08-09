/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const result = {};
  
  for (const [name, value] of Object.entries(obj)) {
    if (!fields.includes(name)) {
      result[name] = value;
    }
  }
  
  return result;
};
