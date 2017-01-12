/**
 * @class Stage
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

  PIXI.utils.skipHello();

  this._generateRoot();

};

/**
 * ルートコンテナの生成
 * @method _generateRoot
 */
Stage.prototype._generateRoot = function () {

  this._rootContainer = new PIXI.Container();
  this._rootContainer.displayList = new PIXI.DisplayList();

  Config.fieldLayer = new PIXI.DisplayGroup(0, true);
  Config.OverlayLayer = new PIXI.DisplayGroup(1, true);

  this._renderer = PIXI.autoDetectRenderer(Config.WIDTH, Config.HEIGHT, {
    transparent: true,
    antialias:   true
  });

  document.getElementById(Stage.STAGE_HTML_ID).appendChild(this._renderer.view);

};


/**
 * コンテナの追加
 * @method addContainer
 */
Stage.prototype.addContainer = function (container) {

  container = new PIXI.Container();
  this._rootContainer.addChild(container);

  return container;

};


/**
 * レンダリング
 * @method rendering
 */
Stage.prototype.rendering = function () {

  this._renderer.render(this._rootContainer);

};