/**
 * @fileoverview Block
 * @constructor
 */

'use strict';

// ================
//     MODULE
// ================

var Config = require('./Config'),
    Unit   = require('./Unit');


// ================
//   CONSTRUCTOR
// ================

var Block = function () {

  Unit.apply(this, arguments);

  this.isDestructible = false;
  this._setStatus();

};

module.exports = Block;

Block.prototype = Object.create(Unit.prototype);
Block.prototype.constructor = Block;


/**
 * ステータス設定
 * @method _setStatus
 */
Block.prototype._setStatus = function () {

  if (Config.blockStatus[this.gridY][this.gridX] === 1) {
    this.isDestructible = true;
  }

  Config.blockStatus[this.gridY][this.gridX] = this;

};


/**
 * ブロックの破壊
 * @method vanish
 */
Block.prototype.vanish = function (delay) {

  var delay = delay || 0;

  setTimeout(function () {
    this.elm.tint = 0xff7e1f;

    TweenMax.to(this.elm, .8, {
      alpha: 0,
      onComplete: function () {

        this.elm.destroy();
        Config.blockStatus[this.gridY][this.gridX] = -1;

      }.bind(this)
    });

  }.bind(this), delay);

};