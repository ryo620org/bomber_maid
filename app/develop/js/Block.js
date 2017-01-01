/**
 * @fileoverview Block
 * @constructor
 * @param posX {Number}
 * @param posY {Number}
 * @param texture {Object}
 * @param options {Object}
 * @param options.broken=false {Boolean}
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config');


// ================
//   CONSTRUCTOR
// ================

var Block = function (posX, posY, texture, options) {

  this.posX = posX;
  this.posY = posY;
  this.texture = texture;
  this.options = options || {};
  this.broken = this.options.broken || false;

  this._init.apply(this);

};

module.exports = Block;


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
Block.prototype._init = function () {

  var elm = new PIXI.Sprite(this.texture);
  elm.anchor.set(0.5, 1);
  elm.position.set(Config.UNIT_SIZE * this.posX + Config.UNIT_SIZE / 2, Config.UNIT_SIZE * (this.posY + 1))
  Config.mapStage.addChild(elm);

};
