const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
// const gitUrl = 'git@gitlab.it.ikang.com:fe/vue-admin-base.git'
const gitUrl = 'direct:git@gitlab.it.ikang.com:fe/vue-admin-base.git'

function createProject (dest, type, name, template) {
  console.log(dest)
  console.log(type)
  console.log(name)
  console.log(template)
  download(gitUrl, dest, { clone: true }, err => {
    const spinner = ora("正在下载模板...");
    spinner.start();
    if (err) {
      spinner.fail();
      console.log(chalk.red(`拉取远程仓库失败${err}`))
      process.exit()
    }
    spinner.succeed();
    console.log(chalk.green(`下载模板成功，正在安装...`))
    process.chdir(name);
    // 执行安装命令
    require('./install');
  })
}

module.exports = {
  createProject
}