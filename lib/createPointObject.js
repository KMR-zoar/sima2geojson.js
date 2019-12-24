'use strict'

const splitLine = require('./splitLine')

const translate = require('../lib/pointTranslate')

const createPointObject = (sima, epsg) => {
  const pointLine = sima.filter(item => {
    return item.match('^A01')
  })

  let pointObject = {}

  pointLine.forEach(line => {
    const splitedLineObject = splitLine(line)
    /*
    測量座標系とGIS座標系ではXとYの取り扱いが逆なので注意
    測量座標系 → 南北がX、東西がY
    GIS座標系 → 南北がY、東西がX
    */

    const geometry = translate(
      [parseFloat(splitedLineObject['y']), parseFloat(splitedLineObject['x'])],
      epsg
    )

    pointObject[splitedLineObject['id']] = geometry
  })

  return pointObject
}

module.exports = createPointObject
