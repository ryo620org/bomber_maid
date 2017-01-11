/**
 * グリッド状に配置されるアイテムを生成する
 * プレイヤーが獲得すると一定の効果がある
 *
 * @class Item
 * @constructor
 * @extends Block
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
    Block  = require('./Block');


// ================
//   CONSTRUCTOR
// ================

var Item = function () {

  Block.apply(this, arguments);

  this._ItemAnimation();

};

module.exports = Item;

Item.prototype = Object.create(Block.prototype);
Item.prototype.constructor = Item;


// ================
//     CONSTANT
// ================



// ================
//      METHOD
// ================

/**
 * 一定時間アニメーションさせる
 * @method _ItemAnimation
 */
Item.prototype._ItemAnimation = function () {

  this._tween = TweenMax.to(this.elm, .5, {
    alpha: 0.5,
    repeat: -1,
    yoyo: true,
  });

};


/**
 * 獲得（=使用）される
 * @method used
 */
Item.prototype.used = function () {

  this._tween.pause();

};
