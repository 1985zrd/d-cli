#!/usr/bin/env node
const program = require('commander');
const { message } = require('./common')
const { init } = require('./init')

if (process.argv.slice(2).join('').toLocaleLowerCase() === '-v') {
  const pkg = require('../package');
  message.info(`${pkg.name} version ${pkg.version}`);
  process.exit()
}

program
  .command('create <type> <name> [otherParams...]')
  .alias('c')
  .description('Generates new project')
  .action(function (type, name, otherParams) {
    // 在这里执行具体的操作
    init(type, name, otherParams)
  });

program.parse(process.argv);

const cmd = process.argv[2];
if (!['c', 'create'].includes(cmd)) {
  program.help();
}
