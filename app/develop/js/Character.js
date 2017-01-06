/**
 * @fileoverview Character
 * @constructor
 * @params gridX [number]
 * @params gridY [number]
 */


'use strict';


// ================
//     MODULE
// ================

var Config = require('./Config'),
    Bomb   = require('./Bomb');


// ================
//   CONSTRUCTOR
// ================

var Character = function (container, gridX, gridY) {

  /**
   * キャラクターのコンテナ
   */
  this._container = container;

  /**
   * キャラクター位置
   */
  this.gridX = gridX;
  this.gridY = gridY;

  /**
   * キャラクター向き
   */
  this.direction = 3;

  /**
   * キャラクターアニメーション要素の配列
   */
  this._elmAnimationCharacter = [];

  /**
   * キャラクター要素
   */
  this._elmCharacter = new PIXI.Container();

  this._init.apply(this);

};

module.exports = Character;


// ================
//     CONSTANT
// ================

Character.ANIMATION_FRAME     = 4; // 4フレーム
Character.ANIMATION_DIRECTION = 4; // 4方向


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Character.prototype._init = function () {

  var
  /**
   * テクスチャの配列（Left: 0, Back: 1, Right: 2, Front: 3）
   */
  ttCharacter = [],
  i, j;

  /**
   * キャラクターアニメーション要素の生成
   */
  for (i = 0; i < Character.ANIMATION_DIRECTION; i++) {
    ttCharacter[i] = [];

    for (j = 0; j < Character.ANIMATION_FRAME; j++) {
      var frame = j === 0 ? 0:
                  j === 1 ? 1:
                  j === 2 ? 0:
                  j === 3 ? 2:
                  0;
      ttCharacter[i].push(PIXI.Texture.fromFrame('character-' + i + '-' + frame));
    }

    this._elmAnimationCharacter.push(new PIXI.extras.AnimatedSprite(ttCharacter[i]));
    this._elmAnimationCharacter[i].play();
    this._elmAnimationCharacter[i].animationSpeed = 0.1;
    this._elmAnimationCharacter[i].anchor.set(0.5, 1);
    this._elmAnimationCharacter[i].visible = false;
    this._elmCharacter.addChild(this._elmAnimationCharacter[i]);
  }

  /**
   * 初期方向を向く
   */
  this._elmAnimationCharacter[this.direction].visible = true;

  this._elmCharacter.position.set((this.gridX + 0.5) * Config.UNIT_SIZE, (this.gridY + 1) * Config.UNIT_SIZE);

  this._container.addChild(this._elmCharacter);

};


/**
 * キャラクターの移動
 * @method move
 */
Character.prototype.move = function (direction) {

  var i,

  /**
   * 全てのアニメーションを非表示
   */
  hideAnimation = function () {
    for (i = 0; i < Character.ANIMATION_DIRECTION; i++) {
      this._elmAnimationCharacter[i].visible = false;
    }
    this._elmAnimationCharacter[this.direction].visible = true;
  }.bind(this),

  /**
   * 移動を制限
   */
  restrictMovement = function () {
    if (this._elmCharacter.x - 40 <= 0) {
      this._elmCharacter.x = 40;
    } else if (this._elmCharacter.x + 40 >= Config.WIDTH) {
      this._elmCharacter.x = Config.WIDTH - 40;
    }

    if (this._elmCharacter.y - 80 <= 0) {
      this._elmCharacter.y = 80;
    } else if (this._elmCharacter.y >= Config.HEIGHT) {
      this._elmCharacter.y = Config.HEIGHT;
    }
  }.bind(this);

  /**
   * 表示切り替え & 移動
   */
  switch (direction) {
    case 'left':
      this.direction = 0;
      hideAnimation();
      this._elmCharacter.x -= 4;
      restrictMovement();
      this.gridX = Math.floor(this._elmCharacter.x / Config.UNIT_SIZE);
      break;
    case 'up':
      this.direction = 1;
      hideAnimation();
      this._elmCharacter.y -= 4;
      restrictMovement();
      this.gridY = Math.floor(this._elmCharacter.y/ Config.UNIT_SIZE);
      break;
    case 'right':
      this.direction = 2;
      hideAnimation();
      this._elmCharacter.x += 4;
      restrictMovement();
      this.gridX = Math.floor(this._elmCharacter.x / Config.UNIT_SIZE);
      break;
    case 'down':
      this.direction = 3;
      hideAnimation();
      this._elmCharacter.y += 4;
      this.gridY = Math.floor(this._elmCharacter.y/ Config.UNIT_SIZE);
      restrictMovement();
      break;
    default:
      break;
  }

};


/**
 * 爆弾を置く
 * @method bomb
 */
Character.prototype.bomb = function () {

  if (Config.numOfBomb > 0) {

    if (Config.blockStatus[this.gridY][this.gridX] <= 0) {

      Config.numOfBomb--;

      var tt   = PIXI.Texture.fromFrame('bomb-0');
      var bomb = new Bomb(this.gridX, this.gridY, tt, this._container);

    }
  }

};