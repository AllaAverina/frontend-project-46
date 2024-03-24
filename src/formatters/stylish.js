import _ from 'lodash';

const signs = {
  equal: ' ',
  deleted: '-',
  added: '+',
  nested: ' ',
};

const makeIndent = (depth, offset = 0, replacer = ' ', size = 4) => (
  replacer.repeat(depth * size - offset)
);

const stringify = (item, depth = 1) => {
  if (!_.isObject(item)) {
    return String(item);
  }
  const lines = _.entries(item).map(([key, value]) => (
    `${makeIndent(depth)}${key}: ${stringify(value, depth + 1)}`
  ));
  return ['{', ...lines, `${makeIndent(depth - 1)}}`].join('\n');
};

export default (diff) => {
  const inner = (item, depth) => {
    const indent = makeIndent(depth, 2);
    if (item.status === 'nested') {
      const lines = item.values.map((value) => inner(value, depth + 1));
      return [`${indent}${signs[item.status]} ${item.key}: {`, ...lines, `${makeIndent(depth)}}`].join('\n');
    }
    if (item.status === 'updated') {
      return [
        `${indent}${signs.deleted} ${item.key}: ${stringify(item.oldValue, depth + 1)}`,
        `${indent}${signs.added} ${item.key}: ${stringify(item.newValue, depth + 1)}`,
      ].join('\n');
    }
    return `${indent}${signs[item.status]} ${item.key}: ${stringify(item.value, depth + 1)}`;
  };
  return ['{', ...(diff.map((item) => inner(item, 1))), '}'].join('\n');
};
