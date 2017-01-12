/**
 * プレイアブルキャラクターを生成する
 *
 * @class Enemy
 * @constructor
 * @extends Character
 * @param name {String} キャラクター名
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */

'use strict';

// ================
//     MODULE
// ================

var Config    = require('./Config'),
    Character = require('./Character');


// ================
//   CONSTRUCTOR
// ================

var Enemy = function () {

  this._frame = 0;
  this._frameOffset =  + Math.floor(Math.random() * 30);
  Character.apply(this, arguments);

};

module.exports = Enemy;

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;


// ================
//     CONSTANT
// ================


// ================
//      METHOD
// ================

/**
 * control
 * @method control
 */
Enemy.prototype.control = function () {

  this.touch();

  if (this._frame < 30 + this._frameOffset) {
    this.move('down');
  } else if (this._frame < 60 + this._frameOffset) {
    this.move('left');
  } else if (this._frame < 90 + this._frameOffset) {
    this.move('up');
  } else if (this._frame < 120 + this._frameOffset) {
    this.move('right');
  } else {
    this._frame = 0;
  }

  this._frame++;
};


/**
 * touch
 * @method touch
 */
Enemy.prototype.touch = function () {

  if (Config.player.gridX === this.gridX && Config.player.gridY === this.gridY) {
    Config.player.miss();
  }

};
