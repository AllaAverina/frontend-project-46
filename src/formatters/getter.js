import stylish from './stylish.js';
import plain from './plain.js';

export default (type) => {
  if (type === 'plain') {
    return plain;
  }
  return stylish;
};
