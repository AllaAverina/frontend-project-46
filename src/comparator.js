import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        status: 'nested',
        key,
        values: compare(obj1[key], obj2[key]),
      };
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return {
          status: 'equal',
          key,
          value: obj1[key],
        };
      }

      return {
        status: 'updated',
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }

    if (_.has(obj1, key)) {
      return {
        status: 'deleted',
        key,
        value: obj1[key],
      };
    }

    if (_.has(obj2, key)) {
      return {
        status: 'added',
        key,
        value: obj2[key],
      };
    }
  });

  return result;
};

export default compare;