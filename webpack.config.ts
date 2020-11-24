import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const config: webpack.Configuration = {
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
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
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
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-typescript',
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
        exclude: [/node_modules/, /build/],
      },
    ],
  },
  plugins: [
    // @ts-ignore:disable-next-line
    // https://github.com/jantimon/html-webpack-plugin/issues/1383
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};

export default config;
