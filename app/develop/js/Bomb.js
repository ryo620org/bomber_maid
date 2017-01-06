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
    this._explosion();
    Config.blockStatus[this.gridY][this.gridX] = 0;
  }.bind(this), Bomb.DURATION);

};


/**
 * 爆発
 * @method _explosion
 */
Bomb.prototype._explosion = function () {

  var FLAG_CONTINUE = 1, // 爆風が続くかどうか
      FLAG_DESTROY  = 2, // 爆風で破壊するかどうか
      flags,
      blasts = [], // 爆風ユニット
      i,
      j,
      tt = PIXI.Texture.fromFrame('explosion-0'),
      explosionContainer = new PIXI.Container(),
      /**
       * 座標のブロックの状態をチェック
       * @function checkUnit
       */
      checkUnit = function (x, y) {

        var mask = 0;

        if (0 <= x && x < Config.HORIZONTAL_UNIT &&
            0 <= y && y < Config.VERTICAL_UNIT) {
          if (Config.blockStatus[y][x] <= 0) {
            mask |= FLAG_CONTINUE;
            return mask;
          } else  if (Config.blockStatus[y][x].isDestructible) {
            mask |= FLAG_DESTROY;
            return mask;
          }
        }

        return mask;

      };

  Config.numOfBomb++;

  this._tween.pause();
  this.elm.tint = 0xff7e1f;

  TweenMax.to(this.elm, .8, {
    alpha: 0,
    onComplete: function () {
      this.elm.destroy();
    }.bind(this)
  });

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
      console.log(flags);
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
