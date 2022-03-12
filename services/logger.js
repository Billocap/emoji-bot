const chalk = require('chalk')

function now() {
  return new Date().toLocaleString()
}

const logger = {
  log(msg) {
    console.log(`${now()} [LOG] ${msg}`)
  },
  info(msg) {
    console.log(chalk`${now()} [{green DONE}] ${msg}`)
  },
  warn(msg) {
    console.log(chalk`${now()} [{yellow WARN}] ${msg}`)
  },
  error(msg) {
    console.log(chalk`${now()} [{red ERROR}] ${msg}`)
  },
  debug(msg) {
    console.log(chalk`${now()} [{blue INFO}] ${msg}`)
  }
}

module.exports = logger
