/**
 * @fileoverview Scene
 * @constructor
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config'),
    Block  = require('./Block');


// ================
//   CONSTRUCTOR
// ================

var Scene = function () {

  this._init.apply(this);

};

module.exports = Scene;


// ================
//     CONSTANT
// ================

Scene.MAPCHIP_QTY     = 3; // マップチップ数
Scene.MAP_DATA = [         // マップデータ
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1],
  [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1],
  [1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 1],
  [1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1],
  [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Scene.prototype._init = function () {

  this._showGround();

};

/**
 * 地面を描画
 * @method _showGround
 */
Scene.prototype._showGround = function () {

  var i,
      j,
      ttMapchip = [],
      mapchips = [],
      blocks = [];

  for (i = 0; i < Scene.MAPCHIP_QTY; i++) {
    ttMapchip.push(PIXI.Texture.fromFrame('map-' + i));
  }

  for (i = 0; i < Config.HORIZONTAL_UNIT; i++) {
    for (j = 0; j < Config.VERTICAL_UNIT; j++) {
      mapchips.push(new Block(i, j, ttMapchip[0]));
      blocks.push(new Block(i, j, ttMapchip[Scene.MAP_DATA[j][i]]));
    }
  }
}