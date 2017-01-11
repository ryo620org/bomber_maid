/**
 * グリッド状に配置される爆弾を生成する
 * 一定時間後に爆発する
 *
 * @class Bomb
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
 * 一定時間アニメーションさせる
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
 * 爆発させる
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

          if (Config.player.gridX === x && Config.player.gridY === y) {
            Config.player.miss();
          }

          if (Config.blockStatus[y][x] === -1) {
            mask |= FLAG_CONTINUE;
            return mask;
          } else  if (Config.blockStatus[y][x].isDestructible) {
            mask |= FLAG_DESTROY;
            return mask;
          } else if (Config.blockStatus[y][x].constructor === Bomb) {
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

  Config.player.numOfBomb++;
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

        blasts[i][j] = new Block(tt, explosionContainer, x, y);
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
