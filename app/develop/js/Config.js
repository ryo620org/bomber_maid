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
Config.VERTICAL_UNIT   = Config.HEIGHT / Config.UNIT_SIZE - 1; // 11
Config.HORIZONTAL_UNIT = Config.WIDTH / Config.UNIT_SIZE; // 20