#!/usr/bin/env node
import { Command } from 'commander';
import parseFile from '../src/fileParser.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const obj1 = parseFile(filepath1);
    const obj2 = parseFile(filepath2);

    console.log(obj1, obj2);
  });

program.parse(process.argv);
