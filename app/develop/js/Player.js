/**
 * プレイアブルキャラクターを生成する
 *
 * @class Player
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
    Character = require('./Character'),
    Bomb      = require('./Bomb');


// ================
//   CONSTRUCTOR
// ================

var Player = function () {

  Character.apply(this, arguments);

  /**
   * 所持ボムの数
   */
  this.numOfBomb = Player.INITIAL_BOMBS;

};

module.exports = Player;

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


// ================
//     CONSTANT
// ================

Player.INITIAL_BOMBS       = 12; // 初期爆弾数

// ================
//      METHOD
// ================

/**
 * ステータス設定
 * @method _setStatus
 */
Player.prototype._setStatus = function () {

};


/**
 * 爆弾を置く
 * @method bomb
 */
Player.prototype.bomb = function () {

  if (this.numOfBomb > 0) {

    if (Config.blockStatus[this.gridY][this.gridX] <= 0) {

      this.numOfBomb--;

      var tt   = PIXI.Texture.fromFrame('bomb-0');
      var bomb = new Bomb(tt, this._container, this.gridX, this.gridY);

    }
  }

};