import parseFile from './parsers.js';
import compare from './comparator.js';
import makeStylish from './stylish.js';

export default (filepath1, filepath2, format) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = compare(obj1, obj2);

  return makeStylish(diff);
};
