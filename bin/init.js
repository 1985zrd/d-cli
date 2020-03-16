const ora = require('ora')
const fs = require('fs-extra')
const readline = require('readline');
const path = require('path')
const chalk = require('chalk')
const { message } = require('./common')
const { createProject } = require('./createProject')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function init (type, name, otherParams) {
  console.log('type', type);
  console.log('name', name);
  console.log('other', otherParams);
  const acceptList = ['vue', 'react']
  if (!acceptList.find(item => item === type)) {
    message.light('create type must one of [vue | react]')
    process.exit()
  }
  // const spinner = ora('project init start.')
  // spinner.start()
  // if (fs.existsSync(boilerplatePath)) fs.emptyDirSync(boilerplatePath)

  let template = 'pc'
  if (otherParams.includes('h5') || otherParams.includes('wap')) {
    template = 'h5'
  }
  const dest = process.cwd();
  const appDir = path.join(dest, `./${name}`);
  // console.log(template)

  if (fs.existsSync(appDir)) {
    rl.question(
      chalk.blue(`${name} dir exist! Do you want clear this dir? (Y/N)`),
      str => {
        const answer = str && str.trim().toUpperCase();
        if (answer === 'Y') {
          const spinner = ora(`remove ${name} dir`).start();
          fs
            .emptyDir(appDir)
            .then(() => {
              spinner.stop();
              createProject(appDir, type, name, template);
            })
            .catch(err => {
              console.error(err);
            });
        } else if (answer === 'N') {
          process.exit();
        }
      }
    );
  } else {
    createProject(appDir, type, name, template);
  }
}

module.exports = {
  init
}
