'use strict'

const splitLine = line => {
  const splittedLine = line.split(',')

  const splittedLineObject = {
    id: splittedLine[1].trim(),
    name: splittedLine[2].trim(),
    x: splittedLine[3].trim(),
    y: splittedLine[4].trim(),
    ele: splittedLine[5].trim()
  }

  return splittedLineObject
}

module.exports = splitLine