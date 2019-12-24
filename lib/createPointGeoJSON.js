'use strict'

const splitLine = require('./splitLine')

const createPointGeoJSON = (pointObjectArray, sima) => {
  const pointGeoJSON = {
    type: 'FeatureCollection',
    features: []
  }

  const pointLine = sima.filter(item => {
    return item.match('^A01')
  })

  pointLine.forEach(line => {
    const splitedLineObject = splitLine(line)

    const geometry = pointObjectArray[splitedLineObject['id']]

    const pointObject = {
      type: 'Feature',
      properties: splitedLineObject,
      geometry: {
        type: 'Point',
        coordinates: geometry
      }
    }

    pointGeoJSON.features.push(pointObject)
  })

  return JSON.stringify(pointGeoJSON)
}

module.exports = createPointGeoJSON
