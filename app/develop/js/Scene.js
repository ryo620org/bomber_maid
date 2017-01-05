/**
 * @fileoverview Scene
 * @constructor
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config'),
    Unit   = require('./Unit'),
    Block  = require('./Block');


// ================
//   CONSTRUCTOR
// ================

var Scene = function (container) {

  this._container = container;
  this._ttMapchip = [];
  this.blocks = [];

  this._init.apply(this);

};

module.exports = Scene;


// ================
//     CONSTANT
// ================

Scene.MAPCHIP_QTY     = 4; // マップチップ数


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Scene.prototype._init = function () {

  var i;

  for (i = 0; i < Scene.MAPCHIP_QTY; i++) {
    this._ttMapchip.push(PIXI.Texture.fromFrame('map-' + i));
  }

  this._showMap();
  this._showBlock();

};

/**
 * 地面を描画
 * @method _showMap
 */
Scene.prototype._showMap = function () {

  var i,
      j,
      mapchips = [];

  for (i = 0; i < Config.HORIZONTAL_UNIT; i++) {
    for (j = 0; j < Config.VERTICAL_UNIT; j++) {
      mapchips.push(new Unit(i, j, this._ttMapchip[0], this._container));
    }
  }
}


/**
 * ブロックを描画
 * @method _showBlock
 */
Scene.prototype._showBlock = function () {

  var i,
      j;

  for (i = 0; i < Config.VERTICAL_UNIT; i++) {
    for (j = 0; j < Config.HORIZONTAL_UNIT; j++) {

      if (Config.blockStatus[i][j] !== 0) {
        var tmp = new Block(j, i, this._ttMapchip[Config.blockStatus[i][j]], this._container);
        Config.blockStatus[i][j] = tmp;
      }

    }
  }

}