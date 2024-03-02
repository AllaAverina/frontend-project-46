import fs from 'fs';
import path from 'path';

const getFileData = (filename) => {
  const filepath = path.normalize(path.resolve(process.cwd(), filename));
  return fs.readFileSync(filepath);
};

export default (filename) => {
  let data = getFileData(filename);
  const extension = path.extname(filename);
  if (extension === '.json') {
    data = JSON.parse(data);
  }
  return data;
};
