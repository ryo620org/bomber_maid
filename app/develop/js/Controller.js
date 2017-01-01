/**
 * @fileoverview Controller
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

var Controller = function () {

  this._init.apply(this);

};

module.exports = Controller;


// ================
//     CONSTANT
// ================

Controller.KEY_QTY   = 256;
Controller.KEY_LEFT  = 37;
Controller.KEY_UP    = 38;
Controller.KEY_RIGHT = 39;
Controller.KEY_DOWN  = 40;

// ================
//      METHOD
// ================

/**
 * 初期化
 * @method _init
 */
Controller.prototype._init = function () {

  var i;

  /**
   * キーの状態を保存
   * true: 押されている, false: 押されていない
   */
  this._keyStatus = new Array(Controller.KEY_QTY);

  for (i = 0; i < Controller.KEY_QTY; i++) {
    this._keyStatus[i] = false;
  }

  /**
   * キーボードが押されたイベント
   */
  document.addEventListener('keydown', function (e){
    this._keyStatus[e.keyCode] = true;
  }.bind(this), false);
  document.addEventListener('keyup', function (e){
    this._keyStatus[e.keyCode] = false;
  }.bind(this), false);

  this._checkInput();

};


/**
 * 入力を常時監視
 * @method _checkInput
 */
Controller.prototype._checkInput = function () {

  /**
   * 矢印キーのチェック
   */
  var check = function () {
    requestAnimationFrame(check);

    if (this._keyStatus[Controller.KEY_LEFT]) {
      Config.character.move('left');
    }
    if (this._keyStatus[Controller.KEY_UP]) {
      Config.character.move('up');
    }
    if (this._keyStatus[Controller.KEY_RIGHT]) {
      Config.character.move('right');
    }
    if (this._keyStatus[Controller.KEY_DOWN]) {
      Config.character.move('down');
    }
  }.bind(this);

  check();

};
