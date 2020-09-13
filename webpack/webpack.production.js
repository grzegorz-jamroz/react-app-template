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
          test: /\.(ttf|woff|woff2|eot)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
        {
          test: /\.(jpe?g|svg|png)$/,
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]",
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
          path.join(__dirname, "../templates/**/*.html.twig"),
          path.join(__dirname, "../assets/js/**/*.js")
        ]),
      }),
    ],
  };
};
