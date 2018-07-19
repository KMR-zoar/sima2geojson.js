'use strict'

const fs = require('fs')

const createPointGeoJSON = (pointObjectArray, sima) => {
  const pointGeoJSON = {
    type: 'FeatureCollection',
    features: []
  }

  sima.forEach(line => {
    console.log()
  })

  const properties = {
    id: splitedLine[1],
    name: splitedLine[2],
    x: splitedLine[3],
    y: splitedLine[4],
    ele: splitedLine[5]
  }

  const pointObject = {
    type: 'Feature',
    properties: properties,
    geometry: {
      type: 'Point',
      coordinates: geometry
    }
  }
}

module.exports = createPointGeoJSON
