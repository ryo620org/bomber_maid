/**
 * @fileoverview Block
 * @constructor
 * @param posX {Number}
 * @param posY {Number}
 * @param texture {Object}
 * @param options {Object}
 * @param options.broken=false {Boolean}
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

var Block = function (posX, posY, texture, options) {

  Unit.apply(this,arguments);

};

module.exports = Block;

Block.prototype = Object.create(Unit.prototype);
Block.prototype.constructor = Block;