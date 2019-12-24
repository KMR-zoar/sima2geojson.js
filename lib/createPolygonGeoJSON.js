'use strict'

const createPolygonGeoJSON = (pointObjectArray, sima) => {
  const PolygonGeoJSON = {
    type: 'FeatureCollection',
    features: []
  }

  const regexp = new RegExp(/(D00[\s\S]*?D99,)/g)
  const targetPolygonArray = sima.match(regexp)

  if (!targetPolygonArray) {
    return false
  }

  targetPolygonArray.forEach(polygonBlock => {
    const splittedBlock = polygonBlock.split('\n')

    let meta = {
      type: 'Feature',
      properties: {
        id: '',
        name: ''
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[]]
      }
    }

    splittedBlock.forEach(line => {
      const splittedLine = line.split(',')

      if (splittedLine[0] === 'D00') {
        meta.properties.id = splittedLine[1].trim()
        meta.properties.name = splittedLine[2].trim()
      }

      if (splittedLine[0] === 'B01') {
        meta.geometry.coordinates[0].push(pointObjectArray[splittedLine[1].trim()])
      }
    })

    meta.geometry.coordinates[0].push(meta.geometry.coordinates[0][0])

    PolygonGeoJSON.features.push(meta)
  })

  return JSON.stringify(PolygonGeoJSON)
}

module.exports = createPolygonGeoJSON
