const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ port }) => {
  return {
    entry: [
      `webpack-hot-middleware/client?path=http://localhost:${port || 8000}/__webpack_hmr`,
      './src/index.tsx',
    ],
    devtool: "inline-source-map",
    devServer: {
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader?sourceMap"],
        },
        {
          test: /\.s[ac]ss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(ttf|woff|woff2|eot|otf)$/i,
          loader: "file-loader",
          options: {
            outputPath: "fonts",
            name: "[name].[ext]",
          },
        },
        {
          test: /\.(jpe?g|svg|png|ico)$/,
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      }),
      new MiniCssExtractPlugin()
    ],
  };
};
