const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO:
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
  },
  entry: {
    'main.js': './src/index.ts',
    'style.css': './src/styles.scss',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'docs'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    inline: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.ts$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /docs/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
