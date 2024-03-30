import _ from 'lodash';

const prepare = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff, parent = '') => (
  diff.map((item) => {
    switch (item.status) {
      case 'added':
        return `Property '${parent}${item.key}' was added with value: ${prepare(item.value)}`;
      case 'deleted':
        return `Property '${parent}${item.key}' was removed`;
      case 'updated':
        return `Property '${parent}${item.key}' was updated. `
        + `From ${prepare(item.oldValue)} to ${prepare(item.newValue)}`;
      case 'nested':
        return plain(item.children, `${parent}${item.key}.`);
      default:
        return '';
    }
  }).filter((item) => item).join('\n')
);

export default plain;
