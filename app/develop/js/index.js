/**
 * @fileoverview BOMBER MAID
*/


'use strict';

require('pixi.js');



/**
 * @namespace
 */
var BOMBER_MAID = BOMBER_MAID || {};


/**
 * @namespace BOMBER_MAID_OBJECT
 * @memberof BOMBER_MAID
 */
BOMBER_MAID.BOMBER_MAID_OBJECT = {
  init: function () {

    var Config       = require('./Config'),
        Character    = require('./Character'),
        Controller   = require('./Controller'),
        Stage        = require('./Stage'),
        Debug        = require('./Debug'),
        Scene        = require('./Scene'),

        /**
         * ローダーを生成
         */
        loader = new PIXI.loaders.Loader();

    /**
     * 画像の読み込み
     */
    loader
    .add('sprite', './_assets/img/sprite.json')
    .once('complete', function(){
      new Stage();
      new Debug();
      new Scene();
      Config.character  = new Character();
      Config.controller = new Controller();
    });

    /**
     * 読み込む
     */
    loader.load();

  }
};


BOMBER_MAID.BOMBER_MAID_OBJECT.init();