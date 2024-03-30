import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, status: 'nested', children: compare(obj1[key], obj2[key]) };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return { key, status: 'equal', value: obj1[key] };
      }
      return {
        key, status: 'updated', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    if (_.has(obj1, key)) {
      return { key, status: 'deleted', value: obj1[key] };
    }
    return { key, status: 'added', value: obj2[key] };
  });
};

export default compare;
