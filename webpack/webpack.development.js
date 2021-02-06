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
          test: /\.(jpe?g|svg|png)$/,
          use: "url-loader",
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
  };
};
