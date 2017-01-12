/**
 * ステージ上を動くキャラクターを生成する
 *
 * @class Character
 * @constructor
 * @param name {String} キャラクター名
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 * @param opts[speed] {Number} スピード
 */


'use strict';


// ================
//     MODULE
// ================

var Config = require('./Config');


// ================
//   CONSTRUCTOR
// ================

var Character = function (name, container, gridX, gridY, opts) {

  /**
   * キャラクター名
   * @property name
   * @type String
   */
  this.name = name;

  /**
   * 親コンテナ
   * @property _container
   * @type PIXI.Container
   */
  this._container = container;

  /**
   * X座標
   * @property gridX
   * @type Number
   */
  this.gridX = gridX;

  /**
   * Y座標
   * @property gridY
   * @type Number
   */
  this.gridY = gridY;

  /**
   * 内部X座標
   * @property innerX
   * @type Number
   */
  this.innerX = Character.INNER_GRID / 2;

  /**
   * 内部Y座標
   * @property innerY
   * @type Number
   */
  this.innerY = Character.INNER_GRID / 2;

  /**
   * キャラクターの向き [Left: 0, Back: 1, Right: 2, Front: 3]
   * @property direction
   * @type Number
   */
  this.direction = 3;

  /**
   * アニメーション要素の配列
   * @property _elmAnimationCharacter
   * @type Array
   */
  this._elmAnimationCharacter = [];

  /**
   * キャラクター要素
   * @property elm
   * @type PIXI.Container
   */
  this.elm = new PIXI.Container();

  /**
   * オプション
   * @property opts
   * @type Object
   */
  this.opts = opts || {};

  /**
   * スピード
   * @property speed
   * @type Number
   */
  this.speed = this.opts.speed || 1;

  this._init.apply(this);

};

module.exports = Character;


// ================
//     CONSTANT
// ================

/**
 * 1方向のアニメーションフレーム数
 * @property ANIMATION_FRAME
 * @type Number
 */
Character.ANIMATION_FRAME     = 4;

/**
 * 方向数
 * @property ANIMATION_DIRECTION
 * @type Number
 */
Character.ANIMATION_DIRECTION = 4;

/**
 * グリッド上から上方向へのオフセット値
 * @property SPRITE_OFFSET_Y
 * @type Number
 */
Character.SPRITE_OFFSET_Y     = 8;

/**
 * 内部グリッド分割数
 * @property INNER_GRID
 * @type Number
 */
Character.INNER_GRID          = 12;


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
       * テクスチャの配列[Left: 0, Back: 1, Right: 2, Front: 3]
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
      ttCharacter[i].push(PIXI.Texture.fromFrame(this.name + '-' + i + '-' + frame));
    }

    this._elmAnimationCharacter.push(new PIXI.extras.AnimatedSprite(ttCharacter[i]));
    this._elmAnimationCharacter[i].animationSpeed = 0.1;
    this._elmAnimationCharacter[i].anchor.set(0.5, 1);
    this._elmAnimationCharacter[i].position.y = -Character.SPRITE_OFFSET_Y;
    this._elmAnimationCharacter[i].visible = false;
    this._elmAnimationCharacter[i].play();
    this.elm.addChild(this._elmAnimationCharacter[i]);
  }

  /**
   * 初期方向
   */
  this._elmAnimationCharacter[this.direction].visible = true;

  /**
   * 初期位置
   */
  this.elm.position.set((this.gridX + 0.5) * Config.UNIT_SIZE_X,
                        (this.gridY + 1)   * Config.UNIT_SIZE_Y);


  this.elm.displayGroup = Config.fieldLayer;
  this.elm.zOrder = -this.elm.position.y;

  this._container.addChild(this.elm);

};


/**
 * キャラクターの移動
 * @method move
 */
Character.prototype.move = function (direction) {

  if (this.elm === null) {
    return 0;
  }

  var i,

      /**
       * 向きを変更
       */
      changeOfDirection = function () {
        for (i = 0; i < Character.ANIMATION_DIRECTION; i++) {
          this._elmAnimationCharacter[i].visible = false;
        }
        this._elmAnimationCharacter[this.direction].visible = true;
      }.bind(this),

      /**
       * grid、innerの位置計算
       */
      checkGrid = function () {
        if (this.innerX < 0) {
          this.innerX = Character.INNER_GRID - 1;
          this.gridX--;
        } else if (this.innerX >= Character.INNER_GRID) {
          this.innerX = 0;
          this.gridX++;
        }
        if (this.innerY < 0) {
          this.innerY = Character.INNER_GRID - 1;
          this.gridY--;
        } else if (this.innerY >= Character.INNER_GRID) {
          this.innerY = 0;
          this.gridY++;
        }
      }.bind(this),

      /**
       * 当たり判定
       */
      collisionDetection = function (x, y) {

        if (direction === 'left' && this.innerX <= Character.INNER_GRID / 2) {
          if (Config.blockStatus[y][x] !== -1) {
            return false;
          }
        }

        if (direction === 'right' && this.innerX >= Character.INNER_GRID / 2) {
          if (Config.blockStatus[y][x] !== -1) {
            return false;
          }
        }

        if (direction === 'up' && this.innerY <= Character.INNER_GRID / 2) {
          if (Config.blockStatus[y][x] !== -1) {
            return false;
          }
        }

        if (direction === 'down' && this.innerY >= Character.INNER_GRID / 2) {
          if (Config.blockStatus[y][x] !== -1) {
            return false;
          }
        }

        return true;
      }.bind(this);

  /**
   * 移動
   */
  switch (direction) {
    case 'left':
      this.direction = 0;
      changeOfDirection();
      if (collisionDetection(this.gridX - 1, this.gridY)) {
        this.elm.x -= Config.UNIT_SIZE_X / Character.INNER_GRID * this.speed;
        this.innerX--;
      }
      break;

    case 'up':
      this.direction = 1;
      changeOfDirection();
      if (collisionDetection(this.gridX, this.gridY - 1)) {
        this.elm.y -= Config.UNIT_SIZE_Y / Character.INNER_GRID * this.speed;
        this.innerY--;
      }
      break;

    case 'right':
      this.direction = 2;
      changeOfDirection();
      if (collisionDetection(this.gridX + 1, this.gridY)) {
        this.elm.x += Config.UNIT_SIZE_X / Character.INNER_GRID * this.speed;
        this.innerX++;
      }
      break;

    case 'down':
      this.direction = 3;
      changeOfDirection();
      if (collisionDetection(this.gridX, this.gridY + 1)) {
        this.elm.y += Config.UNIT_SIZE_Y / Character.INNER_GRID * this.speed;
        this.innerY++;
      }
      break;

    default:
      break;
  }

  /** z-index */
  this.elm.zOrder = -this.elm.position.y;


  checkGrid();

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
      this.elm = null;

    }.bind(this)
  });

};