#!/usr/bin/env node

'use strict';

const fs = require('fs');
const iconv = require('iconv-lite');
const proj4 = require('proj4');
const program = require('commander');

program
  .version('0.0.0')
  .usage('-S <file...> -E <Code of the EPSG>')
  .option('-S, --sima <s>', 'Source SIMA file')
  .option('-E --epsg <n>', 'Source EPSG code. Search from http://epsg.io/')
  .parse(process.argv);

//引数は必須にする
if (!program.sima || !program.epsg) {
  console.log('Not enough options.');
  process.exit(1);
}

const targetSIMA = program.sima;
const epsg = program.epsg;

/*
変換対象になる空間参照系の登録
測地成果2000は EPSG:2443～EPSG:2461
測地成果2011は EPSG:6669～EPSG:6687
情報は http://epsg.io/ より取得
*/
proj4.defs(
  'EPSG:2443',
  '+proj=tmerc +lat_0=33 +lon_0=129.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2444',
  '+proj=tmerc +lat_0=33 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2445',
  '+proj=tmerc +lat_0=36 +lon_0=132.1666666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2446',
  '+proj=tmerc +lat_0=33 +lon_0=133.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2447',
  '+proj=tmerc +lat_0=36 +lon_0=134.3333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2448',
  '+proj=tmerc +lat_0=36 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2449',
  '+proj=tmerc +lat_0=36 +lon_0=137.1666666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2450',
  '+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2451',
  '+proj=tmerc +lat_0=36 +lon_0=139.8333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2452',
  '+proj=tmerc +lat_0=40 +lon_0=140.8333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2453',
  '+proj=tmerc +lat_0=44 +lon_0=140.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2454',
  '+proj=tmerc +lat_0=44 +lon_0=142.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2455',
  '+proj=tmerc +lat_0=44 +lon_0=144.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2456',
  '+proj=tmerc +lat_0=26 +lon_0=142 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2457',
  '+proj=tmerc +lat_0=26 +lon_0=127.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2458',
  '+proj=tmerc +lat_0=26 +lon_0=124 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2459',
  '+proj=tmerc +lat_0=26 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2460',
  '+proj=tmerc +lat_0=20 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:2461',
  '+proj=tmerc +lat_0=26 +lon_0=154 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6669',
  '+proj=tmerc +lat_0=33 +lon_0=129.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6670',
  '+proj=tmerc +lat_0=33 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6671',
  '+proj=tmerc +lat_0=36 +lon_0=132.1666666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6672',
  '+proj=tmerc +lat_0=33 +lon_0=133.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6673',
  '+proj=tmerc +lat_0=36 +lon_0=134.3333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6674',
  '+proj=tmerc +lat_0=36 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6675',
  '+proj=tmerc +lat_0=36 +lon_0=137.1666666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6676',
  '+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6677',
  '+proj=tmerc +lat_0=36 +lon_0=139.8333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6678',
  '+proj=tmerc +lat_0=40 +lon_0=140.8333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6679',
  '+proj=tmerc +lat_0=44 +lon_0=140.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6680',
  '+proj=tmerc +lat_0=44 +lon_0=142.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6681',
  '+proj=tmerc +lat_0=44 +lon_0=144.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6682',
  '+proj=tmerc +lat_0=26 +lon_0=142 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6683',
  '+proj=tmerc +lat_0=26 +lon_0=127.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6684',
  '+proj=tmerc +lat_0=26 +lon_0=124 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6685',
  '+proj=tmerc +lat_0=26 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6686',
  '+proj=tmerc +lat_0=20 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);
proj4.defs(
  'EPSG:6687',
  '+proj=tmerc +lat_0=26 +lon_0=154 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);

if (!((epsg >= 2443 && epsg <= 2461) || (epsg >= 6669 && epsg <= 6687))) {
  const message = 'Out of range for support EPSG codes: ' + epsg;
  console.error(message);
  process.exit(1);
}

//座標値の変換処理関数
const translate = (xy, epsg) => {
  const epsgStr = 'EPSG:' + epsg;
  return proj4(epsgStr, 'EPSG:4326', xy);
};

fs.readFile(targetSIMA, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  /*
  旧SIMAデータ(測量データ共通フォーマット(CSV版))では
  ファイル形式: 1行1レコードの MS-DOS テキストファイル
  漢字コード: シフト JIS コード
  と定められているので文字コードを ShiftJIS、改行を CRLF として処理をする
  */
  const buf = new Buffer(data, 'binary');
  const simaObj = iconv.decode(buf, 'Shift_JIS');

  const simasplitted = simaObj.split('\r\n');

  const pointLine = simasplitted.filter(item => {
    return item.match('^A01');
  });

  const pointGeoJSON = {
    type: 'FeatureCollection',
    features: []
  };

  pointLine.forEach(line => {
    const splitedLine = line.split(',');
    /*
    測量座標系とGIS座標系ではXとYの取り扱いが逆なので注意
    測量座標系 → 南北がX、東西がY
    GIS座標系 → 南北がY、東西がX
    */
    const geometry = translate(
      [parseFloat(splitedLine[4]), parseFloat(splitedLine[3])],
      epsg
    );

    const pointObject = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: []
      }
    };

    pointObject.properties.name = splitedLine[2];
    pointObject.properties.id = splitedLine[1];
    pointObject.properties.elevation = splitedLine[5];

    pointObject.geometry.coordinates = geometry;

    pointGeoJSON.features.push(pointObject);
  });

  const pointGeoJSONFileName = targetSIMA + '.point.geojson';

  fs.writeFile(pointGeoJSONFileName, JSON.stringify(pointGeoJSON), err => {
    if (err) {
      console.error(err);
    }
  });
});
