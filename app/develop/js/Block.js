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

};

module.exports = Block;

Block.prototype = Object.create(Unit.prototype);
Block.prototype.constructor = Block;


/**
 * ブロックの破壊
 * @method setTexture
 */
Block.prototype.destroy = function () {

  this.elm.tint = 0xff7e1f;
  Config.mapStatus[this.gridY][this.gridX] = 0;

  TweenMax.to(this.elm, .8, {
    alpha: 0,
    onComplete: function () {
      this.elm.destroy();
    }.bind(this)
  });

};
