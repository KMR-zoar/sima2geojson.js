const assert = require('assert')
const splitLine = require('../lib/splitLine')

describe('行を値ごとに分割する', () => {
  const lineArray = [
    'A01, 2640,                     Auto-3374, -23795.960, -32832.251,      0.000,',
    'A01, 2695,                     Auto-3423,-23799.510,-32796.200,0.000,',
    'A01, 2732,Auto-3457,-23802.371,-32833.104,0.000,'
  ]
  const result = [
    {
      id: '2640',
      name: 'Auto-3374',
      x: '-23795.960',
      y: '-32832.251',
      ele: '0.000'
    },
    {
      id: '2695',
      name: 'Auto-3423',
      x: '-23799.510',
      y: '-32796.200',
      ele: '0.000'
    },
    {
      id: '2732',
      name: 'Auto-3457',
      x: '-23802.371',
      y: '-32833.104',
      ele: '0.000'
    }
  ]
  it('空白埋めされた行の処理', () => {
    assert.equal(
      JSON.stringify(splitLine(lineArray[0])),
      JSON.stringify(result[0])
    )
  })
  it('空白埋めされたり､されてない行の処理', () => {
    assert.equal(
      JSON.stringify(splitLine(lineArray[1])),
      JSON.stringify(result[1])
    )
  })
  it('空白埋めされていない行の処理', () => {
    assert.equal(
      JSON.stringify(splitLine(lineArray[2])),
      JSON.stringify(result[2])
    )
  })
})
