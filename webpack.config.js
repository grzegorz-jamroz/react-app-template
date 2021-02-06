const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./webpack/webpack.${env}`)(env);
const presetConfig = require("./webpack/loadPresets");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

module.exports = ({ mode, port, presets } = { mode: "production", port: 8000, presets: [] }) => {
  return merge(
    {
      mode,
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      entry: [
        `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
        './src/index.tsx',
      ],
      target: 'web',
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        publicPath: "/",
      },
      devServer: {
        hot: true
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            loader: 'awesome-typescript-loader'
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
              },
            ],
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
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html",
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "assets/img",
              to: "img",
            },
          ],
        }),
        new Dotenv(),
        new webpack.DefinePlugin({
          "process.env": dotenv.parsed,
        }),
      ],
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
