/**
 * @fileoverview BOMBER MAID
*/


'use strict';


// ================
//     MODULE
// ================

require('pixi.js');
require('pixi-display');
require('./lib/TweenMax.min.js');

var Config       = require('./Config'),
    Character    = require('./Character'),
    Stage        = require('./Stage'),
    Debug        = require('./Debug'),
    Scene        = require('./Scene');


/**
 * @namespace
 */
var BOMBER_MAID = BOMBER_MAID || {};


/**
 * @namespace BOMBER_MAID_OBJECT
 * @memberof BOMBER_MAID
 */
BOMBER_MAID.BOMBER_MAID_OBJECT = {

  /**
   * 初期化
   */
  init: function () {

    var i,
        /**
         * ローダーを生成
         */
        loader = new PIXI.loaders.Loader();

    /**
     * キーの状態を保存
     * true: 押されている, false: 押されていない
     */
    this.keyStatus = [];

    for (i = 0; i < Config.KEY_QTY; i++) {
      this.keyStatus.push(false);
    }

    /**
     * キーボードが押されたイベント
     */
    document.addEventListener('keydown', function (e){
      this.keyStatus[e.keyCode] = true;
    }.bind(this), false);

    document.addEventListener('keyup', function (e){
      this.keyStatus[e.keyCode] = false;
    }.bind(this), false);

    /**
     * 画像の読込後、ゲーム開始
     */
    loader
    .add('sprite', './_assets/img/sprite.json')
    .once('complete', function(){

      var debugContainer;
      var sceneContainer;

      /**
       * ステージ生成、レイヤー追加
       */
      this.stage     = new Stage();
      sceneContainer = this.stage.addContainer(sceneContainer);
      debugContainer = this.stage.addContainer(debugContainer);

      /**
       * デバッグ追加
       */
      this.debug     = new Debug(debugContainer);

      /**
       * シーン追加
       */
      this.scene     = new Scene(sceneContainer);

      /**
       * キャラクター追加
       */
      Config.character = new Character(sceneContainer, 10, 6);

      this.mainLoop();

    }.bind(this));

    /**
     * 読み込む
     */
    loader.load();

  },


  /**
   * メインループ
   */
  mainLoop: function () {

    var tick = function () {
      requestAnimationFrame(tick);

      this.stage.rendering();
      Config.character.debug();

      if (this.keyStatus[Config.KEY_LEFT]) {
        Config.character.move('left');
        Config.character.elm.zOrder = -Config.character.elm.position.y;
      }
      if (this.keyStatus[Config.KEY_UP]) {
        Config.character.move('up');
        Config.character.elm.zOrder = -Config.character.elm.position.y;
      }
      if (this.keyStatus[Config.KEY_RIGHT]) {
        Config.character.move('right');
        Config.character.elm.zOrder = -Config.character.elm.position.y;
      }
      if (this.keyStatus[Config.KEY_DOWN]) {
        Config.character.move('down');
        Config.character.elm.zOrder = -Config.character.elm.position.y;
      }
      if (this.keyStatus[Config.KEY_SPACE]) {
        Config.character.bomb();
      }
    }.bind(this);

    tick();
  }


};


BOMBER_MAID.BOMBER_MAID_OBJECT.init();