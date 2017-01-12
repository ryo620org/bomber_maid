/**
 * タイトル
 *
 * @class Title
 * @constructor
 * @param container {PIXI.Container} 配置するコンテナ
 */

'use strict';

// ================
//     MODULE
// ================

var Config    = require('./Config');


// ================
//   CONSTRUCTOR
// ================

var Title = function (container) {

  /**
   * 親コンテナ
   * @property _container
   * @type PIXI.Container
   */
  this._container = container;
  this.isMiss = false;
  this.isClear = false;

  this._inc.apply(this);

};

module.exports = Title;


// ================
//     CONSTANT
// ================


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _inc
 */
Title.prototype._inc = function () {

  var tt = PIXI.Texture.fromFrame('title');
  var elm = new PIXI.Sprite(tt);
  var bg = new PIXI.Graphics().beginFill(0x000000).drawRect(0, 0, Config.WIDTH, Config.HEIGHT);

  bg.alpha = 0.5;

  elm.anchor.set(0.5);
  elm.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF);
  elm.scale.set(10);
  elm.alpha = 0;
  this._container.addChild(bg, elm);

  TweenMax.to(elm.scale, 0.8, {
    x: 1,
    y: 1,
    ease: Bounce.easeOut
  });

  TweenMax.to(elm, 0.8, {
    alpha: 1
  });

  setTimeout(function () {
    TweenMax.to(elm, 0.5, {
      alpha: 0,
      onComplete: function () {
        this._showDescription();
      }.bind(this)
    });
  }.bind(this), 2000);

};

/**
 * 説明文
 * @method _showDescription
 */
Title.prototype._showDescription = function () {
  var tt = PIXI.Texture.fromFrame('description');
  var elm = new PIXI.Sprite(tt);

  elm.alpha = 0;
  elm.anchor.set(0.5);
  elm.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF + 100);

  this._container.addChild(elm);

  TweenMax.to(elm, 0.5, {
    alpha: 1,
    y: '-=' + 100
  });

  setTimeout(function () {
    TweenMax.to(this._container, 0.5, {
      alpha: 0,
      onComplete: function () {
        elm.destroy();
        elm = null;
      }
    });
  }.bind(this), 2000);
};

/**
 * テキスト表示
 * @method showText
 */
Title.prototype.showText = function (text) {

  if (text === 'miss') {
    if (this.isMiss === true) {
      console.log('h');
      return 0;
    } else {
      this.isMiss = true;
    }
  } else if (text === 'clear') {
    if (this.isClear === true) {
      return 0;
    } else {
      this.isClear = true;
    }
  }

  var tt = PIXI.Texture.fromFrame(text);
  var elm = new PIXI.Sprite(tt);

  elm.alpha = 0;
  elm.anchor.set(0.5);
  elm.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF + 100);

  this._container.addChild(elm);
  this._container.alpha = 1;

  TweenMax.to(elm, 0.5, {
    alpha: 1,
    y: '-=' + 100
  });
};