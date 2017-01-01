/**
 * @fileoverview Stage
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

var Stage = function () {

  this._init.apply(this);

};

module.exports = Stage;


// ================
//     CONSTANT
// ================

Stage.STAGE_HTML_ID = 'stage';


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Stage.prototype._init = function () {

  this._generateStage();
  this._rendering();

};

/**
 * ステージの生成
 * @method _generateStage
 */
Stage.prototype._generateStage = function () {

  PIXI.utils.skipHello();

  Config.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(Config.WIDTH, Config.HEIGHT, {
    transparent: true,
    antialias:   true
  });

  document.getElementById(Stage.STAGE_HTML_ID).appendChild(this.renderer.view);

  this.renderer.render(Config.stage);

  Config.moveStage      = new PIXI.Container();
  Config.mapStage      = new PIXI.Container();
  Config.stage.addChild(
    Config.mapStage,
    Config.moveStage
  );
};


/**
 * レンダリング
 * @method _rendering
 */
Stage.prototype._rendering = function () {
  var animation = function () {

    requestAnimationFrame(animation);
    this.renderer.render(Config.stage);

  }.bind(this);

  animation();

};