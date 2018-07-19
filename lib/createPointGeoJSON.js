'use strict'

const createPointGeoJSON = (pointObjectArray, sima) => {
  const pointGeoJSON = {
    type: 'FeatureCollection',
    features: []
  }

  const pointLine = sima.filter(item => {
    return item.match('^A01')
  })

  pointLine.forEach(line => {
    const splitedLine = line.split(',')

    const properties = {
      id: splitedLine[1],
      name: splitedLine[2],
      x: splitedLine[3],
      y: splitedLine[4],
      ele: splitedLine[5]
    }

    const geometry = pointObjectArray[splitedLine[1]]

    const pointObject = {
      type: 'Feature',
      properties: properties,
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
