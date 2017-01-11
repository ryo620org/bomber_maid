/**
 * グリッド状に配置されるブロックを生成する
 *
 * @class Block
 * @constructor
 * @extends Unit
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

var Config = require('./Config'),
    Unit   = require('./Unit');


// ================
//   CONSTRUCTOR
// ================

var Block = function () {

  Unit.apply(this, arguments);

  /**
   * 破壊できるかどうか
   * @property isDestructible
   * @type Boolean
   */
  this.isDestructible = false;

  this._setStatus();
  this._setLayer();

};

module.exports = Block;

Block.prototype = Object.create(Unit.prototype);
Block.prototype.constructor = Block;


/**
 * オブジェクトのレイヤーを設定する
 * @method _setLayer
 */
Block.prototype._setLayer = function () {

  this.elm.displayGroup = Config.fieldLayer;
  this.elm.zOrder = -this.elm.position.y;

};


/**
 * オブジェクトのステータスを設定する
 * @method _setStatus
 */
Block.prototype._setStatus = function () {

  if (Config.blockStatus[this.gridY][this.gridX] === 1 ||
      Config.blockStatus[this.gridY][this.gridX] === 16 ||
      Config.blockStatus[this.gridY][this.gridX] === 17 ||
      Config.blockStatus[this.gridY][this.gridX] === 18 ||
      Config.blockStatus[this.gridY][this.gridX] === 19 ||
      Config.blockStatus[this.gridY][this.gridX] === 20 ||
      Config.blockStatus[this.gridY][this.gridX] === 21 ||
      Config.blockStatus[this.gridY][this.gridX] === 22 ||
      Config.blockStatus[this.gridY][this.gridX] === 23) {
    this.isDestructible = true;
  }

  Config.blockStatus[this.gridY][this.gridX] = this;

};


/**
 * ブロックを破壊する
 * @method vanish
 * @param {Number} 遅延時間[ms]
 */
Block.prototype.vanish = function (delay) {

  var delay = delay || 0;

  Config.blockStatus[this.gridY][this.gridX] = -1;

  setTimeout(function () {
    this.elm.tint = 0xff7e1f;

    TweenMax.to(this.elm, .8, {
      alpha: 0,
      onComplete: function () {

        this.elm.destroy();
        this.elm = null;

      }.bind(this)
    });

  }.bind(this), delay);

};