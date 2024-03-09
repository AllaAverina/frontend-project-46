import path from 'path';
import { fileURLToPath } from 'url';
import { describe, test, expect } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('gendiff function', () => {
  test('comparing json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(gendiff(filepath1, filepath2)).toEqual(expected);
  });

  test('comparing yaml files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(gendiff(filepath1, filepath2)).toEqual(expected);
  });

  test('comparing with an empty json file', () => {
    const filepath1 = getFixturePath('empty.json');
    const filepath2 = getFixturePath('file2.json');
    const output = '{\n  + host: hexlet.io\n  + timeout: 20\n  + verbose: true\n}';

    expect(gendiff(filepath1, filepath2)).toEqual(output);
  });
});
