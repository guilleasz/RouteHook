const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0'],
        },
      },
    ],
  },
};
