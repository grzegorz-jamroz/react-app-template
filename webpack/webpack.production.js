const path = require("path");
const glob = require("glob-all");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

module.exports = () => {
  return {
    output: {
      filename: "[name].[hash].js",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: ["node_modules"],
                },
              },
            },
          ],
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
          test: /\.(jpe?g|svg|png)$/,
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
      }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, "../src/**/*.html"),
          path.join(__dirname, "../src/**/*.ts"),
          path.join(__dirname, "../src/**/*.tsx"),
        ]),
      }),
    ],
  };
};
