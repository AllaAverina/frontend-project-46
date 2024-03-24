import _ from 'lodash';

const prepare = (value) => {
  let prepared = value;
  if (_.isObject(value)) {
    prepared = '[complex value]';
  }
  if (_.isString(value)) {
    prepared = `'${value}'`;
  }
  return prepared;
};

const plain = (diff, parent = '') => (
  diff.map((item) => {
    let line;
    switch (item.status) {
      case 'added':
        line = `Property '${parent}${item.key}' was added with value: ${prepare(item.value)}`;
        break;
      case 'deleted':
        line = `Property '${parent}${item.key}' was removed`;
        break;
      case 'updated':
        line = `Property '${parent}${item.key}' was updated. `
        + `From ${prepare(item.oldValue)} to ${prepare(item.newValue)}`;
        break;
      case 'nested':
        line = plain(item.values, `${parent}${item.key}.`);
        break;
      default:
        break;
    }
    return line;
  }).filter((item) => item).join('\n')
);

export default plain;
