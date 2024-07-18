const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    home: './src/js/pages/home/initHome.js',
    product: './src/js/pages/product/initProduct.js',
    search: './src/js/pages/search/initSearch.js',
    cart: './src/js/pages/cart/initCart.js',
    register: './src/js/pages/register/initRegister.js',
    login: './src/js/pages/login/initLogin.js',
    account: './src/js/pages/account/initAccount.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: false,
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'home',
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      title: 'product',
      filename: 'product.html',
      template: './src/pages/product.html',
      chunks: ['product'],
    }),
    new HtmlWebpackPlugin({
      title: 'search',
      filename: 'search.html',
      template: './src/pages/search.html',
      chunks: ['search'],
    }),
    new HtmlWebpackPlugin({
      title: 'cart',
      filename: 'cart.html',
      template: './src/pages/cart.html',
      chunks: ['cart'],
    }),
    new HtmlWebpackPlugin({
      title: 'register',
      filename: 'register.html',
      template: './src/pages/register.html',
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      title: 'login',
      filename: 'login.html',
      template: './src/pages/login.html',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      title: 'account',
      filename: 'account.html',
      template: './src/pages/account.html',
      chunks: ['account'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    open: true,
    liveReload: true,
    hot: true,
  },
}
