const assert = require('assert')
const createPolygonGeoJSON = require('../lib/createPolygonGeoJSON')

describe('CreatePolygonGeoJSON', () => {
  const pointObject = JSON.parse(
    '{"2640":[139.47014059349652,35.784969013693264],"2695":[139.4705395305001,35.784938219986756],"2732":[139.47013142059532,35.78491120040886],"2901":[139.47056873048672,35.78480027526157],"2956":[139.47011409379812,35.78477341270535],"2995":[139.46991551812337,35.78474949480919],"3109":[139.46992695060663,35.78468025155899],"3180":[139.4705986879446,35.78464410750279],"3305":[139.46994583930626,35.78456472846219],"3324":[139.4697910280243,35.784549938082094],"3342":[139.46968637123777,35.78454254604038],"3357":[139.47061952050737,35.78453390812855],"3504":[139.4697149053223,35.784417515856845],"3539":[139.47064954784423,35.78438666393117],"3639":[139.47066202871187,35.78432025400777],"3699":[139.47067060589777,35.78428036807116],"3764":[139.46995463681057,35.78423347266289],"3792":[139.4697602051699,35.7842132084907],"3816":[139.4697662204075,35.78418702441567],"3853":[139.46977492257915,35.78415136625541],"3892":[139.4703733273053,35.78412956754099],"3911":[139.47045521060576,35.784114293404386],"3916":[139.47022861032093,35.78410879618402],"3961":[139.47040642794738,35.784075279948105],"3995":[139.46985421302497,35.784054467392714],"4007":[139.46979765291627,35.784044886319364]}'
  )
  const simaObj = `G00,01,,
Z00,座標ﾃﾞｰﾀ,
A00,
A01,2640,Auto-3374,-23795.960,-32832.251,0.000,
A01,2695,Auto-3423,-23799.510,-32796.200,0.000,
A01,2732,Auto-3457,-23802.371,-32833.104,0.000,
A01,2901,Auto-3609,-23814.824,-32793.617,0.000,
A01,2956,Auto-3659,-23817.652,-32834.727,0.000,
A01,2995,Auto-3694,-23820.239,-32852.688,0.000,
A01,3109,Auto-3797,-23827.925,-32851.683,0.000,
A01,3180,Auto-3860,-23832.160,-32790.973,0.000,
A01,3305,Auto-3973,-23840.748,-32850.023,0.000,
A01,3324,Auto-3990,-23842.337,-32864.024,0.000,
A01,3342,Auto-4005,-23843.122,-32873.488,0.000,
A01,3357,Auto-4019,-23844.393,-32789.135,0.000,
A01,3504,Auto-4151,-23857.003,-32870.960,0.000,
A01,3539,Auto-4183,-23860.739,-32786.481,0.000,
A01,3639,Auto-4273,-23868.111,-32785.380,0.000,
A01,3699,Auto-4327,-23872.539,-32784.621,0.000,
A01,3764,Auto-4386,-23877.502,-32849.364,0.000,
A01,3792,Auto-4410,-23879.685,-32866.949,0.000,
A01,3816,Auto-4432,-23882.592,-32866.416,0.000,
A01,3853,Auto-4466,-23886.551,-32865.644,0.000,
A01,3892,Auto-4500,-23889.170,-32811.557,0.000,
A01,3911,Auto-4518,-23890.892,-32804.161,0.000,
A01,3916,Auto-4522,-23891.426,-32824.648,0.000,
A01,3961,Auto-4563,-23895.204,-32808.587,0.000,
A01,3995,Auto-4594,-23897.328,-32858.516,0.000,
A01,4007,Auto-4604,-23898.372,-32863.633,0.000,
A99,
Z00,区画ﾃﾞｰﾀ,
D00,1203,669,1,
B01,3792,Auto-4410,
B01,3816,Auto-4432,
B01,3853,Auto-4466,
B01,4007,Auto-4604,
B01,3995,Auto-4594,
B01,3916,Auto-4522,
B01,3892,Auto-4500,
B01,3961,Auto-4563,
B01,3911,Auto-4518,
B01,3699,Auto-4327,
B01,3639,Auto-4273,
B01,3764,Auto-4386,
D99,
D00,1210,673,1,
B01,3324,Auto-3990,
B01,3342,Auto-4005,
B01,3504,Auto-4151,
B01,3792,Auto-4410,
B01,3764,Auto-4386,
B01,3639,Auto-4273,
B01,3539,Auto-4183,
B01,3357,Auto-4019,
B01,3180,Auto-3860,
B01,3305,Auto-3973,
D99,
D00,1225,682,1,
B01,2901,Auto-3609,
B01,2695,Auto-3423,
B01,2640,Auto-3374,
B01,2732,Auto-3457,
B01,2956,Auto-3659,
B01,2995,Auto-3694,
B01,3109,Auto-3797,
B01,3305,Auto-3973,
B01,3180,Auto-3860,
D99,
`
  const simaObjSpaced = `G00,01,,
Z00,座標ﾃﾞｰﾀ,
A00,
A01, 2640,Auto-3374           , -23795.960, -32832.251,     0.000,
A01, 2695,Auto-3423           , -23799.510, -32796.200,     0.000,
A01, 2732,Auto-3457           , -23802.371, -32833.104,     0.000,
A01, 2901,Auto-3609           , -23814.824, -32793.617,     0.000,
A01, 2956,Auto-3659           , -23817.652, -32834.727,     0.000,
A01, 2995,Auto-3694           , -23820.239, -32852.688,     0.000,
A01, 3109,Auto-3797           , -23827.925, -32851.683,     0.000,
A01, 3180,Auto-3860           , -23832.160, -32790.973,     0.000,
A01, 3305,Auto-3973           , -23840.748, -32850.023,     0.000,
A01, 3324,Auto-3990           , -23842.337, -32864.024,     0.000,
A01, 3342,Auto-4005           , -23843.122, -32873.488,     0.000,
A01, 3357,Auto-4019           , -23844.393, -32789.135,     0.000,
A01, 3504,Auto-4151           , -23857.003, -32870.960,     0.000,
A01, 3539,Auto-4183           , -23860.739, -32786.481,     0.000,
A01, 3639,Auto-4273           , -23868.111, -32785.380,     0.000,
A01, 3699,Auto-4327           , -23872.539, -32784.621,     0.000,
A01, 3764,Auto-4386           , -23877.502, -32849.364,     0.000,
A01, 3792,Auto-4410           , -23879.685, -32866.949,     0.000,
A01, 3816,Auto-4432           , -23882.592, -32866.416,     0.000,
A01, 3853,Auto-4466           , -23886.551, -32865.644,     0.000,
A01, 3892,Auto-4500           , -23889.170, -32811.557,     0.000,
A01, 3911,Auto-4518           , -23890.892, -32804.161,     0.000,
A01, 3916,Auto-4522           , -23891.426, -32824.648,     0.000,
A01, 3961,Auto-4563           , -23895.204, -32808.587,     0.000,
A01, 3995,Auto-4594           , -23897.328, -32858.516,     0.000,
A01, 4007,Auto-4604           , -23898.372, -32863.633,     0.000,
A99,
Z00,区画ﾃﾞｰﾀ,
D00, 1203,669       ,1,
B01, 3792,Auto-4410           ,
B01, 3816,Auto-4432           ,
B01, 3853,Auto-4466           ,
B01, 4007,Auto-4604           ,
B01, 3995,Auto-4594           ,
B01, 3916,Auto-4522           ,
B01, 3892,Auto-4500           ,
B01, 3961,Auto-4563           ,
B01, 3911,Auto-4518           ,
B01, 3699,Auto-4327           ,
B01, 3639,Auto-4273           ,
B01, 3764,Auto-4386           ,
D99,
D00, 1210,673       ,1,
B01, 3324,Auto-3990           ,
B01, 3342,Auto-4005           ,
B01, 3504,Auto-4151           ,
B01, 3792,Auto-4410           ,
B01, 3764,Auto-4386           ,
B01, 3639,Auto-4273           ,
B01, 3539,Auto-4183           ,
B01, 3357,Auto-4019           ,
B01, 3180,Auto-3860           ,
B01, 3305,Auto-3973           ,
D99,
D00, 1225,682       ,1,
B01, 2901,Auto-3609           ,
B01, 2695,Auto-3423           ,
B01, 2640,Auto-3374           ,
B01, 2732,Auto-3457           ,
B01, 2956,Auto-3659,           
B01, 2995,Auto-3694           ,
B01, 3109,Auto-3797           ,
B01, 3305,Auto-3973           ,
B01, 3180,Auto-3860           ,
D99,
`

  const result =
    '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":"1203","name":"669"},"geometry":{"type":"Polygon","coordinates":[[[139.4697602051699,35.7842132084907],[139.4697662204075,35.78418702441567],[139.46977492257915,35.78415136625541],[139.46979765291627,35.784044886319364],[139.46985421302497,35.784054467392714],[139.47022861032093,35.78410879618402],[139.4703733273053,35.78412956754099],[139.47040642794738,35.784075279948105],[139.47045521060576,35.784114293404386],[139.47067060589777,35.78428036807116],[139.47066202871187,35.78432025400777],[139.46995463681057,35.78423347266289],[139.4697602051699,35.7842132084907]]]}},{"type":"Feature","properties":{"id":"1210","name":"673"},"geometry":{"type":"Polygon","coordinates":[[[139.4697910280243,35.784549938082094],[139.46968637123777,35.78454254604038],[139.4697149053223,35.784417515856845],[139.4697602051699,35.7842132084907],[139.46995463681057,35.78423347266289],[139.47066202871187,35.78432025400777],[139.47064954784423,35.78438666393117],[139.47061952050737,35.78453390812855],[139.4705986879446,35.78464410750279],[139.46994583930626,35.78456472846219],[139.4697910280243,35.784549938082094]]]}},{"type":"Feature","properties":{"id":"1225","name":"682"},"geometry":{"type":"Polygon","coordinates":[[[139.47056873048672,35.78480027526157],[139.4705395305001,35.784938219986756],[139.47014059349652,35.784969013693264],[139.47013142059532,35.78491120040886],[139.47011409379812,35.78477341270535],[139.46991551812337,35.78474949480919],[139.46992695060663,35.78468025155899],[139.46994583930626,35.78456472846219],[139.4705986879446,35.78464410750279],[139.47056873048672,35.78480027526157]]]}}]}'

  it('ポリゴンのGeoJSONを作成', () => {
    assert.equal(createPolygonGeoJSON(pointObject, simaObj), result)
  })
  it('空白埋めデータからポリゴンのGeoJSONを作成', () => {
    assert.equal(createPolygonGeoJSON(pointObject, simaObjSpaced), result)
  })
})
