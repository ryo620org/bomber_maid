/**
 * @class Scene
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
  this._ttBase = [];
  this._ttBlock = [];
  this.blocks = [];

  this._init.apply(this);

};

module.exports = Scene;


// ================
//     CONSTANT
// ================


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Scene.prototype._init = function () {

  var i;

  for (i = 0; i < Config.NUMBER_OF_BASECHIP; i++) {
    this._ttBase.push(PIXI.Texture.fromFrame('base-' + i));
  }

  for (i = 0; i < Config.NUMBER_OF_BLOCKCHIP; i++) {
    this._ttBlock.push(PIXI.Texture.fromFrame('block-' + i));
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
      j;

  for (i = 0; i < Config.VERTICAL_UNIT; i++) {
    for (j = 0; j < Config.HORIZONTAL_UNIT; j++) {

      if (Config.baseStatus[i][j] >= 0) {
        var tmp = new Unit(this._ttBase[Config.baseStatus[i][j]], this._container, j, i);
        Config.baseStatus[i][j] = tmp;
      }

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

      if (Config.blockStatus[i][j] >= 0) {
        var tmp = new Block(this._ttBlock[Config.blockStatus[i][j]], this._container, j, i);
        Config.blockStatus[i][j] = tmp;
      }

    }
  }

}