import path from 'path';
import { fileURLToPath } from 'url';
import { describe, test, expect } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

describe('gendiff stylish format', () => {
  test('comparing json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  });

  test('comparing yaml files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  });
});

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

describe('gendiff plain format', () => {
  test('comparing json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  });

  test('comparing yaml files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  });
});

const expectedJson = '[{"key":"common","status":"nested","values":['
+ '{"key":"follow","status":"added","value":false},'
+ '{"key":"setting1","status":"equal","value":"Value 1"},'
+ '{"key":"setting2","status":"deleted","value":200},'
+ '{"key":"setting3","status":"updated","oldValue":true,"newValue":null},'
+ '{"key":"setting4","status":"added","value":"blah blah"},'
+ '{"key":"setting5","status":"added","value":{"key5":"value5"}},'
+ '{"key":"setting6","status":"nested","values":['
+ '{"key":"doge","status":"nested","values":['
+ '{"key":"wow","status":"updated","oldValue":"","newValue":"so much"}]},'
+ '{"key":"key","status":"equal","value":"value"},'
+ '{"key":"ops","status":"added","value":"vops"}]}]},'
+ '{"key":"group1","status":"nested","values":['
+ '{"key":"baz","status":"updated","oldValue":"bas","newValue":"bars"},'
+ '{"key":"foo","status":"equal","value":"bar"},'
+ '{"key":"nest","status":"updated","oldValue":{"key":"value"},"newValue":"str"}]},'
+ '{"key":"group2","status":"deleted","value":{"abc":12345,"deep":{"id":45}}},'
+ '{"key":"group3","status":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

describe('gendiff json format', () => {
  test('comparing json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });

  test('comparing yaml files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });
});
