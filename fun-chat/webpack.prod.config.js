const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    filename: "[name].[contenthash:7].js",
    publicPath: "",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
       test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
