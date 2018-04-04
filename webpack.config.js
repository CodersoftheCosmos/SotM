const path = require('path');

module.exports = {
  entry: path.resolve('./client/src/index.js'),
  output: {
    path: path.resolve('./client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
{
  test: /\.(scss|css)$/,
  loaders: ['style-loader', 'css-loader']
}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}