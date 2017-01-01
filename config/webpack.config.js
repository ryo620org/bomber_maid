var webpack = require('webpack');
var path = require('path');

module.exports = {

  entry: {
    'index': './app/develop/js/index.js',
  },

  output: {
    path: './app/public/_assets/js',
    filename: 'bundle.js'
  },

  resolve: {
    root: [
      path.resolve('./js')
    ]
  },

  module: {
    loaders: [
      {
        test: /pixi.js/,
        loader: 'transform?brfs'
      }
    ]
  },

  plugins: [
//    new webpack.optimize.UglifyJsPlugin()
  ]
};
