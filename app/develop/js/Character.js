/**
 * @fileoverview Character
 * @constructor
 */


'use strict';


// ================
//     MODULE
// ================

var Config = require('./Config');


// ================
//   CONSTRUCTOR
// ================

var Character = function () {

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
Character.DEFAULT_DIRECTION   = 3; // Left: 0, Up: 1, Right: 2, Down: 3


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
  this._elmAnimationCharacter[Character.DEFAULT_DIRECTION].visible = true;

  this._elmCharacter.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF);

  Config.moveStage.addChild(this._elmCharacter);

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
      hideAnimation();
      this._elmAnimationCharacter[0].visible = true;
      this._elmCharacter.position.x -= 4;
      restrictMovement();
      break;
    case 'up':
      hideAnimation();
      this._elmAnimationCharacter[1].visible = true;
      this._elmCharacter.position.y -= 4;
      restrictMovement();
      break;
    case 'right':
      hideAnimation();
      this._elmAnimationCharacter[2].visible = true;
      this._elmCharacter.position.x += 4;
      restrictMovement();
      break;
    case 'down':
      hideAnimation();
      this._elmAnimationCharacter[3].visible = true;
      this._elmCharacter.position.y += 4;
      restrictMovement();
      break;
    default:
      break;
  }

  return 0;

};