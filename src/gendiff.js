import _ from 'lodash';
import parseFile from './fileParser.js';

const compare = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`  ${key}: ${obj1[key]}`);
      } else {
        acc.push(`- ${key}: ${obj1[key]}`);
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    } else if (_.has(obj1, key)) {
      acc.push(`- ${key}: ${obj1[key]}`);
    } else {
      acc.push(`+ ${key}: ${obj2[key]}`);
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
