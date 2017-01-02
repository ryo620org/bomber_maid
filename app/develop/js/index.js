/**
 * @fileoverview BOMBER MAID
*/


'use strict';


// ================
//     MODULE
// ================

require('pixi.js');
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

    var i;

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
     * ローダーを生成
     */
    var loader = new PIXI.loaders.Loader();

    /**
     * 画像の読込後、ゲーム開始
     */
    loader
    .add('sprite', './_assets/img/sprite.json')
    .once('complete', function(){

      this.startGame();

    }.bind(this));

    /**
     * 読み込む
     */
    loader.load();

  },

  /**
   * ゲーム開始
   */
  startGame: function () {

    new Stage();
    new Debug();
    new Scene();

    this.character  = new Character();

    this.mainLoop();

  },


  /**
   * メインループ
   */
  mainLoop: function () {

    var tick = function () {
      requestAnimationFrame(tick);

      if (this.keyStatus[Config.KEY_LEFT]) {
        this.character.move('left');
      }
      if (this.keyStatus[Config.KEY_UP]) {
        this.character.move('up');
      }
      if (this.keyStatus[Config.KEY_RIGHT]) {
        this.character.move('right');
      }
      if (this.keyStatus[Config.KEY_DOWN]) {
        this.character.move('down');
      }
    }.bind(this);

    tick();
  }
};


BOMBER_MAID.BOMBER_MAID_OBJECT.init();