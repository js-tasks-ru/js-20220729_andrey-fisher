/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const result = {};
  const objProps = Object.keys(obj);

  for (const item in fields) {
    const propName = fields[item];
    if (objProps.indexOf(propName) >= 0) {
      result[propName] = obj[propName];
    }
  }

  return result;
};
