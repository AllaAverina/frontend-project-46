import stylish from './stylish.js';
import plain from './plain.js';

export default (type) => {
  switch (type) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(`Unknown format type: '${type}'.`);
  }
};
