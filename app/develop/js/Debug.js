/**
 * @fileoverview Debug
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

var Debug = function () {

  this._init.apply(this);

};

module.exports = Debug;


// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Debug.prototype._init = function () {

//  this._showGrid();

};

/**
 * グリッドの描画
 * @method _showGrid
 */
Debug.prototype._showGrid = function () {

  var verticalLine = [],
      horizontalLine = [],
      debugStage = new PIXI.Container(),
      i;

  /**
   * 水平ライン
   */
  for (i = 0; i < Config.VERTICAL_UNIT; i++) {
    verticalLine.push(new PIXI.Graphics().beginFill(Config.COLOR_RED).drawRect(0, 0, Config.WIDTH, 2));
    verticalLine[i].position.set(0, Config.UNIT_SIZE * i);
    debugStage.addChild(verticalLine[i]);
  }

  /**
   * 垂直ライン
   */
  for (i = 0; i < Config.HORIZONTAL_UNIT; i++) {
    horizontalLine.push(new PIXI.Graphics().beginFill(Config.COLOR_YELLOW).drawRect(0, 0, 2, Config.HEIGHT));
    horizontalLine[i].position.set(Config.UNIT_SIZE * i, 0);
    debugStage.addChild(horizontalLine[i]);
  }

  debugStage.alpha = 0.5;
  Config.stage.addChild(debugStage);

};
