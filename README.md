# sima2geojson

測量データ共通フォーマット(SIMA)の旧版形式で記録されたファイルを GeoJSON ファイルに変換します。

SIMA データが持つ座標は日本の平面直角座標系 I ～ XIX まで対応しています。  
世界測地系座標であれば測地成果2000でも測地成果2011でも変換できます。

## Usage

npm から取得してください

```
# npm i -g sima2geojson
```

コマンドラインから SIMA ファイル名と測地系の EPSG コードを指定して実行します。

```
Usage: sima2geojson -S <file ...> -E <Code of the EPSG>

Options:

  -V, --version   output the version number
  -S, --sima <s>  Source SIMA file
  -E --epsg <n>   Source EPSG code. Search from http://epsg.io/
  -h, --help      output usage information
```

## EPSG コード

各測地系の EPSG コードは次の通りです。

測地成果2000

|座標系|EPSG|
|:-:|:-:|
|I|2443|
|↓|↓|↓|
|XIX|2461|

測地成果2011

|座標系|EPSG|
|:-:|:-:|
|I|6669|
|↓|↓|
|XIX|6687|


---
2018 K'z Minor Release - Zoar