/**
 * BOMBER MAID
*/


'use strict';


// ================
//     MODULE
// ================

require('pixi.js');
require('pixi-display');
require('./lib/TweenMax.min.js');

var Config       = require('./Config'),
    Player       = require('./Player'),
    Enemy        = require('./Enemy'),
    Debug        = require('./Debug'),
    Stage        = require('./Stage'),
    Title        = require('./Title'),
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

      var sceneContainer,
          titleContainer;

      /**
       * ステージ生成、レイヤー追加
       */
      this.stage     = new Stage();
      sceneContainer = this.stage.addContainer(sceneContainer);
      titleContainer = this.stage.addContainer(titleContainer);
      titleContainer.displayGroup = Config.OverlayLayer;
      sceneContainer.position.set(-Config.UNIT_SIZE_X / 2, 0);

      if (Config.DEBUG_MODE) {

        var debugContainer;

        debugContainer = this.stage.addContainer(debugContainer);

        /**
         * デバッグ追加
         */
        this.debug     = new Debug(debugContainer);
      }

      /**
       * タイトル
       */
      this.title     = new Title(titleContainer);

      /**
       * シーン追加
       */
      this.scene     = new Scene(sceneContainer);

      /**
       * キャラクター追加
       */
      Config.player = new Player('player', sceneContainer, 2, 2);

      /**
       * 敵追加
       */
      Config.enemys = [];
      Config.enemys.push(new Enemy('enemy', sceneContainer, 2, 16));
      Config.enemys.push(new Enemy('enemy', sceneContainer, 18, 2));
      Config.enemys.push(new Enemy('enemy', sceneContainer, 18, 16));
      Config.enemys.push(new Enemy('enemy', sceneContainer, 10, 8));

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
      var i;

      this.stage.rendering();

      if (this.keyStatus[Config.KEY_LEFT]) {
        Config.player.move('left');
      }
      if (this.keyStatus[Config.KEY_UP]) {
        Config.player.move('up');
      }
      if (this.keyStatus[Config.KEY_RIGHT]) {
        Config.player.move('right');
      }
      if (this.keyStatus[Config.KEY_DOWN]) {
        Config.player.move('down');
      }
      if (this.keyStatus[Config.KEY_SPACE]) {
        Config.player.bomb();
      }

      for (i = 0; i < Config.enemys.length; i++) {
        Config.enemys[i].control();
        if (Config.enemys[i].elm === null) {
          Config.enemys.splice(i, 1);
        }
      }

      if (Config.player.elm === null) {
        this.title.showText('miss');
      }

      if (Config.enemys.length === 0) {
        this.title.showText('clear');
      }

      requestAnimationFrame(tick);

    }.bind(this);


    tick();
  }


};


BOMBER_MAID.BOMBER_MAID_OBJECT.init();