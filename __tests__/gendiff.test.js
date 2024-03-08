import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

test('gendiff json', () => {
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(gendiff(filepath1, filepath2)).toEqual(expected);
});
