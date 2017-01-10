/**
 * @fileoverview Bomb
 * @constructor
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config'),
    Block   = require('./Block');


// ================
//   CONSTRUCTOR
// ================

var Bomb = function () {

  Block.apply(this, arguments);

  this.strength = 4;
  this.isExploded = false;
  this._bombAnimation();

};

module.exports = Bomb;

Bomb.prototype = Object.create(Block.prototype);
Bomb.prototype.constructor = Bomb;


// ================
//     CONSTANT
// ================

Bomb.DURATION = 3000;


// ================
//      METHOD
// ================

/**
 * アニメーション
 * @method _bombAnimation
 */
Bomb.prototype._bombAnimation = function () {

  this._tween = TweenMax.to(this.elm.scale, .5, {
    x: 0.9,
    y: 0.9,
    repeat: -1,
    yoyo: true,
    ease: SteppedEase.config(1)
  });

  setTimeout(function () {
    this.explosion();
  }.bind(this), Bomb.DURATION);

};


/**
 * 爆発
 * @method explosion
 */
Bomb.prototype.explosion = function () {

  var FLAG_CONTINUE = 1, // 爆風が続くかどうか
      FLAG_DESTROY  = 2, // 爆風で破壊するかどうか
      flags,
      blasts = [], // 爆風ユニット
      i,
      j,
      tt = PIXI.Texture.fromFrame('explosion-0'),
      explosionContainer = new PIXI.Container(),
      /**
       * 任意のグリッド上の状態をチェック
       * @function checkUnit
       */
      checkUnit = function (x, y) {

        var mask = 0;

        if (0 <= x && x < Config.HORIZONTAL_UNIT &&
            0 <= y && y < Config.VERTICAL_UNIT) {

          if (Config.character.gridX === x && Config.character.gridY === y) {
            /**
             * 爆風上にキャラクターがいる場合ミス
             */
            Config.character.miss();
          }

          if (Config.blockStatus[y][x] === -1) {
            mask |= FLAG_CONTINUE;
            return mask;
          } else  if (Config.blockStatus[y][x].isDestructible) {
            mask |= FLAG_DESTROY;
            return mask;
          } else if (Config.blockStatus[y][x].constructor === Bomb) {
            /**
             * 爆風上に爆弾がある場合、爆発させる
             */
            Config.blockStatus[y][x].explosion();
          }
        }

        return mask;

      };
  /**
   * 爆発してない場合のみ爆発させる
   */
  if (this.isExploded) {
    return 0;
  } else {
    this.isExploded = true;
  }

  Config.character.numOfBomb++;
  Config.blockStatus[this.gridY][this.gridX] = 0;

  this._tween.pause();
  this.vanish();

  /**
   * 上下左右に爆風を伸ばす
   */
  for (i = 0; i < 4; i++) {

    blasts[i] = [];

    for (j = 1; j <= this.strength; j++) {

      var x = i === 0 ? this.gridX - j:
              i === 1 ? this.gridX:
              i === 2 ? this.gridX + j:
              i === 3 ? this.gridX:
              0;

      var y = i === 0 ? this.gridY:
              i === 1 ? this.gridY - j:
              i === 2 ? this.gridY:
              i === 3 ? this.gridY + j:
              0;

      blasts[i][j] = 0;

      flags = checkUnit(x, y);

      if ((flags & FLAG_DESTROY) != 0) {
        Config.blockStatus[y][x].vanish();
      }

      if ((flags & FLAG_CONTINUE) != 0) {

        blasts[i][j] = new Block(x, y, tt, explosionContainer);
        blasts[i][j].vanish(500);

      } else {

        break;

      }

    }
  }

  /**
   * 爆風スプライトを一定時間後に消去
   */
  this._container.addChild(explosionContainer);

};
