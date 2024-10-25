/* eslint-disable no-undef */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  entry: {
    app: "./src/app.js",
    home: "./src/js/pages/home/initHome.js",
    product: "./src/js/pages/product/initProduct.js",
    search: "./src/js/pages/search/initSearch.js",
    cart: "./src/js/pages/cart/initCart.js",
    register: "./src/js/pages/register/initRegister.js",
    login: "./src/js/pages/login/initLogin.js",
    account: "./src/js/pages/account/initAccount.js",
    transaction: "./src/js/pages/transaction/initTransaction.js",
    orders: "./src/js/pages/orders/initOrders.js",
    error: "./src/js/pages/error/initError.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: false,
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "home",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["app", "home"],
    }),
    new HtmlWebpackPlugin({
      title: "product",
      filename: "product.html",
      template: "./src/pages/product.html",
      chunks: ["app", "product"],
    }),
    new HtmlWebpackPlugin({
      title: "search",
      filename: "search.html",
      template: "./src/pages/search.html",
      chunks: ["app", "search"],
    }),
    new HtmlWebpackPlugin({
      title: "cart",
      filename: "cart.html",
      template: "./src/pages/cart.html",
      chunks: ["app", "cart"],
    }),
    new HtmlWebpackPlugin({
      title: "register",
      filename: "register.html",
      template: "./src/pages/register.html",
      chunks: ["app", "register"],
    }),
    new HtmlWebpackPlugin({
      title: "login",
      filename: "login.html",
      template: "./src/pages/login.html",
      chunks: ["app", "login"],
    }),
    new HtmlWebpackPlugin({
      title: "account",
      filename: "account.html",
      template: "./src/pages/account.html",
      chunks: ["app", "account"],
    }),
    new HtmlWebpackPlugin({
      title: "transaction",
      filename: "transaction.html",
      template: "./src/pages/transaction.html",
      chunks: ["app", "transaction"],
    }),
    new HtmlWebpackPlugin({
      title: "orders",
      filename: "orders.html",
      template: "./src/pages/orders.html",
      chunks: ["app", "orders"],
    }),
    new HtmlWebpackPlugin({
      title: "error",
      filename: "error.html",
      template: "./src/pages/error.html",
      chunks: ["app", "error"],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    open: true,
    liveReload: true,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/product/, to: "/product.html" },
        { from: /^\/search/, to: "/search.html" },
        { from: /^\/cart/, to: "/cart.html" },
        { from: /^\/register/, to: "/register.html" },
        { from: /^\/login/, to: "/login.html" },
        { from: /^\/account/, to: "/account.html" },
        { from: /^\/transaction/, to: "/transaction.html" },
        { from: /^\/orders/, to: "/orders.html" },
        // Fallback for all other routes
        { from: /./, to: "/error.html" },
      ],
    },
  },
}
