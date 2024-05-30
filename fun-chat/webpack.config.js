const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const paths = {
  entry: {
    index: path.join(__dirname, './src/index.ts'),
    outputFileName: '[name].js',
  },
  outputFolder: path.join(__dirname, './dist'),
  html: {
    input: path.join(__dirname, './src/index.html'),
    outputFileName: 'index.html',
  },
  cssFileName: 'style.[contenthash:7].css',
  imagesFolder: path.join(__dirname, './src/assets/images'),
  imagesFileName: 'assets/images/[name].[contenthash:7][ext]',
  fontsFolder: path.join(__dirname, './src/assets/fonts'),
  fontsFileName: 'assets/fonts/[name].[contenthash:7][ext]',
  svgForSpriteFolder: path.join(__dirname, './src/assets/svg-for-sprite'),
  favicons: {
    from: path.join(__dirname, './src/assets/favicons'),
    to: path.join(__dirname, './dist/assets/favicons'),
  },
  nodeModules: path.join(__dirname, './node_modules'),
};

const baseConfig = {
  entry: {
    index: paths.entry.index,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico|webp|svg)$/,
        exclude: [paths.fontsFolder, paths.svgForSpriteFolder],
        type: 'asset',
        generator: {
          filename: paths.imagesFileName,
        },
      },
      {
        test: /\.svg$/,
        include: paths.svgForSpriteFolder,
        use: ['svg-sprite-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        include: paths.fontsFolder,
        type: 'asset/resource',
        generator: {
          filename: paths.fontsFileName,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: paths.entry.outputFileName,
    path: paths.outputFolder,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin(),
    new ESLintPlugin({ fix: true }),
    new MiniCssExtractPlugin({
      filename: paths.cssFileName,
    }),
    new HtmlWebpackPlugin({
      template: paths.html.input,
      filename: paths.html.outputFileName,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.favicons.from,
          to: paths.favicons.to,
        },
      ],
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
