const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve("dist"),
    filename: "[name]-[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    modules: ['node_modules'],
    alias: {
      "~": path.resolve("./src"),
    },
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [
                  require("tailwindcss"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};