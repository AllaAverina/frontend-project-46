import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseText = (data) => ({ ...data.toString().replaceAll('\r\n', '\n').split('\n') });

const getParser = (extension) => {
  if (extension === '.json') {
    return JSON.parse;
  }
  if (['.yml', '.yaml'].includes(extension)) {
    return yaml.load;
  }
  return parseText;
};

export default (filename) => {
  const filepath = path.normalize(path.resolve(process.cwd(), filename));
  const data = fs.readFileSync(filepath, 'utf8');
  if (data.length > 0) {
    const parse = getParser(path.extname(filename));
    return parse(data);
  }
  return {};
};
