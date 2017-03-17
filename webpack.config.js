const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [    
    path.join(__dirname + '/src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname + '/bundle'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: /\.jsx$/
    }
    ]
  }
};