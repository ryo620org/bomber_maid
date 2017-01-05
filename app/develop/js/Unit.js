/**
 * @fileoverview Unit
 * @constructor
 * @param gridX {Number}
 * @param gridY {Number}
 * @param texture {Object}
 * @param container {Object}
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config');


// ================
//   CONSTRUCTOR
// ================

var Unit = function (gridX, gridY, texture, container) {

  this.gridX      = gridX;
  this.gridY      = gridY;

  this._texture   = texture;
  this._container = container;

  this._init.apply(this);

};

module.exports = Unit;


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
Unit.prototype._init = function () {

  this.elm = new PIXI.Sprite(this._texture);

  this.elm.anchor.set(0.5, 1);
  this.elm.position.set(Config.UNIT_SIZE * this.gridX + Config.UNIT_SIZE / 2, Config.UNIT_SIZE * (this.gridY + 1))
  this._container.addChild(this.elm);

};


/**
 * テクスチャのセット
 * @method setTexture
 */
Unit.prototype.setTexture = function (texture) {

  this.elm.texture = texture;

};