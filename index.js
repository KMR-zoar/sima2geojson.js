#!/usr/bin/env node

'use strict'

const fs = require('fs')
const iconv = require('iconv-lite')
const program = require('commander')
const translate = require('./lib/pointTranslate')
const createPntGeoJSON = require('./lib/createPointGeoJSON')

program
  .version('0.0.0')
  .usage('-S <file...> -E <Code of the EPSG>')
  .option('-S, --sima <s>', 'Source SIMA file')
  .option('-E --epsg <n>', 'Source EPSG code. Search from http://epsg.io/')
  .parse(process.argv)

//引数は必須にする
if (!program.sima || !program.epsg) {
  console.log('Not enough options.')
  process.exit(1)
}

const targetSIMA = program.sima
const epsg = program.epsg

/*
変換対象になる空間参照系の登録
測地成果2000は EPSG:2443～EPSG:2461
測地成果2011は EPSG:6669～EPSG:6687
情報は http://epsg.io/ より取得
*/
if (!((epsg >= 2443 && epsg <= 2461) || (epsg >= 6669 && epsg <= 6687))) {
  const message = 'Out of range for support EPSG codes: ' + epsg
  console.error(message)
  process.exit(1)
}

fs.readFile(targetSIMA, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  /*
  旧SIMAデータ(測量データ共通フォーマット(CSV版))では
  ファイル形式: 1行1レコードの MS-DOS テキストファイル
  漢字コード: シフト JIS コード
  と定められているので文字コードを ShiftJIS、改行を CRLF として処理をする
  */
  const buf = new Buffer(data, 'binary')
  const simaObj = iconv.decode(buf, 'Shift_JIS')

  const simasplitted = simaObj.split('\r\n')

  const pointLine = simasplitted.filter(item => {
    return item.match('^A01')
  })

  const pointGeoJSON = {
    type: 'FeatureCollection',
    features: []
  }

  pointLine.forEach(line => {
    const splitedLine = line.split(',')
    /*
    測量座標系とGIS座標系ではXとYの取り扱いが逆なので注意
    測量座標系 → 南北がX、東西がY
    GIS座標系 → 南北がY、東西がX
    */
    const geometry = translate(
      [parseFloat(splitedLine[4]), parseFloat(splitedLine[3])],
      epsg
    )

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

    pointGeoJSON.features.push(pointObject)
  })

  const pointGeoJSONFileName = targetSIMA + '.point.geojson'

  fs.writeFile(pointGeoJSONFileName, JSON.stringify(pointGeoJSON), err => {
    if (err) {
      console.error(err)
    }
  })
})
