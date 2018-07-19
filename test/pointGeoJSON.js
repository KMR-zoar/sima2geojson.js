const assert = require('assert')
const createPointGeoJSON = require('../lib/createPointGeoJSON')

describe('CreatePointGeoJSON', () => {
  const pointObject = JSON.parse(
    `{"1":[139.47010288722936,35.78303749470585],"2":[139.47005778103122,35.78305614260324],"3":[139.47008167506849,35.78306086575214],"4":[139.47009652948714,35.783063632701186]}`
  )
  const simasplitted = JSON.parse(
    `["G00,02,-,","A00,","A01,1,T-5965,-24010.239,-32836.454,0.000,","A01,2,T-5937,-24008.155,-32840.524,0.000,","A01,3,T-5929,-24007.639,-32838.362,0.000,","A01,4,T-5926,-24007.337,-32837.018,0.000,","A99,","D00,1,446-2,1,","B01,4,T-5926,","B01,3,T-5929,","B01,2,T-5937,","B01,1,T-5965,","D99,",""]`
  )
  const result = `{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":"1","name":"T-5965","x":"-24010.239","y":"-32836.454","ele":"0.000"},"geometry":{"type":"Point","coordinates":[139.47010288722936,35.78303749470585]}},{"type":"Feature","properties":{"id":"2","name":"T-5937","x":"-24008.155","y":"-32840.524","ele":"0.000"},"geometry":{"type":"Point","coordinates":[139.47005778103122,35.78305614260324]}},{"type":"Feature","properties":{"id":"3","name":"T-5929","x":"-24007.639","y":"-32838.362","ele":"0.000"},"geometry":{"type":"Point","coordinates":[139.47008167506849,35.78306086575214]}},{"type":"Feature","properties":{"id":"4","name":"T-5926","x":"-24007.337","y":"-32837.018","ele":"0.000"},"geometry":{"type":"Point","coordinates":[139.47009652948714,35.783063632701186]}}]}`
  it('pointGeoJSON', () => {
    assert.equal(createPointGeoJSON(pointObject, simasplitted), result)
  })
})
