import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.load;
    default:
      throw new Error(`Unknown file extension: '${extension}'.`);
  }
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
