'use strict';

var util = require('util');

module.exports = [
  {
    src: './app/develop/img/*.{png,gif,jpg}',
    destImage: './app/public/_assets/img/sprite.png',
    destCSS: './app/public/_assets/img/sprite.json',
    cssTemplate: require('spritesmith-texturepacker'),
    padding: 4,
    algorithmOpts: { sort: false },
  },

];
