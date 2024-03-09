import _ from 'lodash';
import parseFile from './parsers.js';

const makeItem = (sign, key, value) => `${sign} ${key}: ${value}`;

const compare = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = keys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      acc.push(makeItem(' ', key, obj1[key]));
      return acc;
    }

    if (_.has(obj1, key)) {
      acc.push(makeItem('-', key, obj1[key]));
    }
    if (_.has(obj2, key)) {
      acc.push(makeItem('+', key, obj2[key]));
    }
    return acc;
  }, []);

  return result;
};

export default (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = compare(obj1, obj2);

  const indent = '  ';
  const sep = '\n';
  return `{${sep + indent}${diff.join(sep + indent)}${sep}}`;
};
