const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  entry: path.join(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp|svg)$/,
        include: path.join(__dirname, './src/assets/images/pictures'),
        type: 'asset',
        generator: {
          filename: 'assets/images/pictures/[name].[contenthash:7][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        include: path.join(__dirname, './src/assets/images/svg-inline'),
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~node-modules': path.resolve(__dirname, './node_modules'),
      '~data-audio': path.resolve(__dirname, './static/audio'),
      '~data-json': path.resolve(__dirname, './static/data'),
      '~data-images': path.resolve(__dirname, './static/images'),
      '~favicons': path.resolve(__dirname, './static/favicons'),
      '~images': path.resolve(__dirname, './src/assets/images/pictures'),
      '~svg-inline': path.resolve(__dirname, './src/assets/svg-inline'),
      '~common-js': path.resolve(__dirname, './src/common/js'),
      '~common-css': path.resolve(__dirname, './src/common/css'),
      '~components': path.resolve(__dirname, './src/components'),
      '~utils': path.resolve(__dirname, './src/components/utils'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
    }),
    new EslingPlugin({ extensions: 'ts' }),
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
