/**
 * @class Debug
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

var Debug = function (container) {

  this._container = container;

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

  this._showGrid();

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
   * グリッド-X
   */
  for (i = 0; i < Config.HORIZONTAL_UNIT; i++) {
    horizontalLine.push(new PIXI.Graphics().beginFill(Config.COLOR_YELLOW).drawRect(0, 0, 2, Config.HEIGHT));
    horizontalLine[i].position.set(Config.UNIT_SIZE_X * i, 0);
    debugStage.addChild(horizontalLine[i]);
  }

  /**
   * グリッド-Y
   */
  for (i = 0; i < Config.VERTICAL_UNIT; i++) {
    verticalLine.push(new PIXI.Graphics().beginFill(Config.COLOR_RED).drawRect(0, 0, Config.WIDTH, 2));
    verticalLine[i].position.set(0, Config.UNIT_SIZE_Y * i);
    debugStage.addChild(verticalLine[i]);
  }

  debugStage.alpha = 0.5;
  this._container.addChild(debugStage);

};
