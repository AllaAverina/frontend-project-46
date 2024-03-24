#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = gendiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse(process.argv);
