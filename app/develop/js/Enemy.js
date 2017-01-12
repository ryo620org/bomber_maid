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

  this._frame++;

  if (this._frame < 30) {
    this.move('down');
  } else if (this._frame < 60) {
    this.move('left');
  } else if (this._frame < 90) {
    this.move('up');
  } else if (this._frame < 120) {
    this.move('right');
  } else {
    this._frame = 0;
  }

  this.touch();
  this.search();

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


/**
 * search
 * @method search
 */
Enemy.prototype.search = function () {

  if (Config.player.gridX === this.gridX) {
    if (this.direction === 0 && this.gridX > Config.player.gridX) {
      Config.player.miss();
    } else if (this.direction === 2 && this.gridX < Config.player.gridX) {
      Config.player.miss();
    }
  }

  if (Config.player.gridY === this.gridY) {
    if (this.direction === 1 && this.gridY > Config.player.gridY) {
      Config.player.miss();
    } else if (this.direction === 3 && this.gridY < Config.player.gridY) {
      Config.player.miss();
    }
  }
};