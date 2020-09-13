const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader?sourceMap"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader?sourceMap",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  includePaths: ["node_modules"],
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|svg|png|ttf|woff|woff2|eot)$/,
          use: "url-loader",
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
  };
};
