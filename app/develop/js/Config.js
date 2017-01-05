/**
 * @fileoverview 変数
 */


'use strict';


var Config = require('./Config');


module.exports = Config;

/**
 * 色の管理
 */
Config.COLOR_YELLOW = 0xffff00;
Config.COLOR_RED    = 0xff0000;
Config.COLOR_WHITE  = 0xffffff;

/**
 * stage の幅
 * @constant
 */
Config.WIDTH       = 1280;
Config.WIDTH_HALF  = 1280 / 2;

/**
 * stage の高さ
 * @constant
 */
Config.HEIGHT      = 768;
Config.HEIGHT_HALF = 768 / 2;

/**
 * ユニットサイズ
 * @constant
 */
Config.UNIT_SIZE = 64;

/**
 * ブロック数
 * @constant
 */
Config.HORIZONTAL_UNIT = Config.WIDTH  / Config.UNIT_SIZE + 1; // 21
Config.VERTICAL_UNIT   = Config.HEIGHT / Config.UNIT_SIZE + 1; // 13

/**
 * キーコード
 * @constant
 */
Config.KEY_SPACE = 32;
Config.KEY_LEFT  = 37;
Config.KEY_UP    = 38;
Config.KEY_RIGHT = 39;
Config.KEY_DOWN  = 40;

/**
 * キーの数
 * @constant
 */
Config.KEY_QTY   = 256;

Config.blockStatus = [         // マップデータ
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1],
  [1, 1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1],
  [1, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1],
  [1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 1, 1],
  [1, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 1],
  [1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

/**
 * 一度に置ける爆弾の数
 */
Config.numOfBomb = 3;