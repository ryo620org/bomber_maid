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
   * キャラクターのコンテナ
   */
  this.numOfBomb = Character.INITIAL_BOMBS;

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
  this.elm = new PIXI.Container();

  this._init.apply(this);
  this.debugInit();
};

module.exports = Character;


// ================
//     CONSTANT
// ================

Character.ANIMATION_FRAME     = 4; // 4フレーム
Character.ANIMATION_DIRECTION = 4; // 4方向
Character.SPRITE_OFFSET_Y     = 8; // グリッド上でのオフセット値
Character.INITIAL_BOMBS       = 3; // 初期爆弾数

// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Character.prototype._init = function () {

  var i, j,
      /**
       * テクスチャの配列（Left: 0, Back: 1, Right: 2, Front: 3）
       */
      ttCharacter = [];

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
    this._elmAnimationCharacter[i].position.y = -Character.SPRITE_OFFSET_Y;
    this._elmAnimationCharacter[i].visible = false;
    this.elm.addChild(this._elmAnimationCharacter[i]);
  }

  this.elm.displayGroup = Config.fieldLayer;

  /**
   * 初期方向を向く
   */
  this._elmAnimationCharacter[this.direction].visible = true;

  this.elm.position.set((this.gridX + 0.5) * Config.UNIT_SIZE, (this.gridY + 1) * Config.UNIT_SIZE);

  this._container.addChild(this.elm);

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
  changeOfDirection = function () {
    for (i = 0; i < Character.ANIMATION_DIRECTION; i++) {
      this._elmAnimationCharacter[i].visible = false;
    }
    this._elmAnimationCharacter[this.direction].visible = true;
  }.bind(this);

  if (Config.blockStatus[this.gridY - 1][this.gridX] !== -1 && direction === 'up') {
    changeOfDirection();
    return 0;
  }
  if (Config.blockStatus[this.gridY + 1][this.gridX] !== -1 && direction === 'down') {
    changeOfDirection();
    return 0;
  }
  if (Config.blockStatus[this.gridY][this.gridX - 1] !== -1 && direction === 'left') {
    changeOfDirection();
    return 0;
  }
  if (Config.blockStatus[this.gridY][this.gridX + 1] !== -1 && direction === 'right') {
    changeOfDirection();
    return 0;
  }

  /**
   * 表示切り替え & 移動
   */
  switch (direction) {
    case 'left':
      this.direction = 0;
      changeOfDirection();
      this.elm.x -= 4;
      this.gridX = Math.floor(this.elm.x / Config.UNIT_SIZE);
      break;
    case 'up':
      this.direction = 1;
      changeOfDirection();
      this.elm.y -= 4;
      this.gridY = Math.floor((this.elm.y - 32) / Config.UNIT_SIZE);
      break;
    case 'right':
      this.direction = 2;
      changeOfDirection();
      this.elm.x += 4;
      this.gridX = Math.floor(this.elm.x / Config.UNIT_SIZE);
      break;
    case 'down':
      this.direction = 3;
      changeOfDirection();
      this.elm.y += 4;
      this.gridY = Math.floor((this.elm.y - 32) / Config.UNIT_SIZE);
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

  if (this.numOfBomb > 0) {

    if (Config.blockStatus[this.gridY][this.gridX] <= 0) {

      this.numOfBomb--;

      var tt   = PIXI.Texture.fromFrame('bomb-0');
      var bomb = new Bomb(this.gridX, this.gridY, tt, this._container);

    }
  }

};


/**
 * ミス
 * @method miss
 */
Character.prototype.miss = function () {

  this._elmAnimationCharacter[this.direction].tint = 0xff0000;

  TweenMax.to(this.elm, .8, {
    alpha: 0,
    onComplete: function () {

      this.elm.destroy({children: true});

    }.bind(this)
  });

};



/**
 * デバッグ
 * @method debugInit
 */
Character.prototype.debugInit = function () {

  this.text = new PIXI.Text('[' + this.gridX + ', ' + this.gridY + ']', {
    fill: 0xffffff,
    stroke: 0x000000,
    strokeThickness: 10
  });

  this.text.anchor.set(0.5);
  this.text.position.set(100, 100);
  this.rect = new PIXI.Graphics().beginFill(0x00ff00).drawRect(0, 0, Config.UNIT_SIZE, Config.UNIT_SIZE);
  this.rect.alpha = 0.5;
  this.rect.position.set(this.gridX * Config.UNIT_SIZE, this.gridY * Config.UNIT_SIZE);
  this._container.addChild(this.text, this.rect);

};

/**
 * デバッグ
 * @method debug
 */
Character.prototype.debug = function () {

  this.text.text = '[' + this.gridX + ', ' + this.gridY + ']';

  this.rect.position.set(this.gridX * Config.UNIT_SIZE, this.gridY * Config.UNIT_SIZE);

};