import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filename) => {
  const filepath = path.normalize(path.resolve(process.cwd(), filename));
  let data = fs.readFileSync(filepath, 'utf8');
  const extension = path.extname(filename);

  if (extension === '.json') {
    data = JSON.parse(data);
  } else if (extension === '.yml') {
    data = yaml.load(data);
  } else {
    data = { ...data.toString().replaceAll('\r\n', '\n').split('\n') };
  }

  return data;
};
