/**
 * グリッド状に配置されるオブジェクトを生成する
 * @class Unit
 * @constructor
 * @param texture {PIXI.Texture} テクスチャ
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config');


// ================
//   CONSTRUCTOR
// ================

var Unit = function (texture, container, gridX, gridY, opts) {

  this.gridX      = gridX;
  this.gridY      = gridY;

  this._texture   = texture;
  this._container = container;

  this.opts = opts || {};

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
  this.elm.position.set(Config.UNIT_SIZE_X * this.gridX + Config.UNIT_SIZE_X / 2, Config.UNIT_SIZE_Y * (this.gridY + 1));
  this._container.addChild(this.elm);

};


/**
 * テクスチャのセット
 * @method setTexture
 */
Unit.prototype.setTexture = function (texture) {

  this.elm.texture = texture;

};