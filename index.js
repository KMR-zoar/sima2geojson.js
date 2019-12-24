#!/usr/bin/env node

'use strict'

const fs = require('fs')
const iconv = require('iconv-lite')
const program = require('commander')
const createPointObject = require('./lib/createPointObject')
const createPointGeoJSON = require('./lib/createPointGeoJSON')
const createPolygonGeoJSON = require('./lib/createPolygonGeoJSON')
const packageInfo = require('./package.json')

program
  .name(packageInfo.name)
  .version(packageInfo.version)
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

let data = Object

try {
  data = fs.readFileSync(targetSIMA)
} catch (error) {
  console.error(error)
  process.exit(1)
}

/*
旧SIMAデータ(測量データ共通フォーマット(CSV版))では
ファイル形式: 1行1レコードの MS-DOS テキストファイル
漢字コード: シフト JIS コード
と定められているので文字コードを ShiftJIS、改行を CRLF として処理をする
*/

const buf = Buffer.from(data, 'binary')
const simaObj = iconv.decode(buf, 'Shift_JIS')

const simasplitted = simaObj.split('\r\n')

const pointObject = createPointObject(simasplitted, epsg)

/*
点情報のみを GeoJSON に書き出す
*/
const pointGeoJSON = createPointGeoJSON(pointObject, simasplitted)
const pointGeoJSONFilename = targetSIMA + '.point.geojson'

fs.writeFile(pointGeoJSONFilename, pointGeoJSON, err => {
  if (err) {
    console.error(err)
  }
})

/*
面情報のみを GeoJSON に書き出す
*/

const polygonGeoJSON = createPolygonGeoJSON(pointObject, simaObj)
const polygonGeoJSONFilename = targetSIMA + '.polygon.geojson'

fs.writeFile(polygonGeoJSONFilename, polygonGeoJSON, err => {
  if (err) {
    console.error(err)
  }
})
