import parseFile from './parsers.js';
import compare from './comparator.js';
import getFormatter from './formatters/getter.js';

export default (filepath1, filepath2, type) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = compare(obj1, obj2);
  const format = getFormatter(type);
  return format(diff);
};
