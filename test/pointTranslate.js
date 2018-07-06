const assert = require('assert');
const translate = require('../lib/pointTranslate');

describe('PointTranslate', () => {
  describe('座標の変換', () => {
    const source = [-32836.454, -24010.239];
    const result6677 = [139.47010288722936, 35.78303749470585];
    const result6677str = JSON.stringify(result6677);

    const result2443 = [129.14945357532244, 32.78298929877649];
    const result2443str = JSON.stringify(result2443);

    it('測地成果2011 9系 → 緯度経度', () => {
      assert.equal(JSON.stringify(translate(source, 6677)), result6677str);
    });

    it('測地成果2000 1系 → 緯度経度', () => {
      assert.equal(JSON.stringify(translate(source, 2443)), result2443str);
    });
  });
});
