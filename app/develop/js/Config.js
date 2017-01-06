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

/**
 * チップの種類数
 * @constant
 */
Config.NUMBER_OF_BASECHIP  = 13;
Config.NUMBER_OF_BLOCKCHIP = 8;

/**
 * ベースのマップ
 * @constant
 */
Config.baseStatus = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0],
  [0, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 6, 8, 0],
  [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0],
  [0, 6, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11,12,10, 0],
  [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * ブロックのマップ
 * @constant
 */
Config.blockStatus = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 3, 4,-1, 2, 3, 4,-1, 2, 3, 4,-1, 2, 3, 4, 0, 0, 0],
  [0, 0, 1, 1,-1,-1, 1,-1, 1,-1,-1, 1, 1,-1,-1,-1,-1, 1, 1, 0, 0],
  [0, 5, 1, 0, 1, 0,-1, 0, 1, 0, 1, 0, 1, 0,-1, 0, 1, 0,-1, 5, 0],
  [0, 6, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1, 1,-1, 1,-1,-1, 6, 0],
  [0, 7,-1, 0,-1, 0, 1, 0, 1, 0,-1, 0,-1, 0,-1, 0, 1, 0, 1, 7, 0],
  [0,-1, 1, 1, 1,-1, 1, 1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 1,-1,-1, 0],
  [0, 5,-1, 0, 1, 0,-1, 0,-1, 0,-1, 0,-1, 0,-1, 0, 1, 0,-1, 5, 0],
  [0, 6, 1, 1, 1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1, 1, 6, 0],
  [0, 7,-1, 0,-1, 0, 1, 0, 1, 0,-1, 0,-1, 0, 1, 0,-1, 0, 1, 7, 0],
  [0, 0,-1,-1, 1,-1, 1,-1, 1, 1,-1,-1,-1,-1,-1, 1,-1, 1, 1, 0, 0],
  [0, 0, 0, 2, 3, 4,-1, 2, 3, 4,-1, 2, 3, 4,-1, 2, 3, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * 一度に置ける爆弾の数
 */
Config.numOfBomb = 3;