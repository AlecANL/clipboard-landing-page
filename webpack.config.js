const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/assets/js/index.js',
    /* remove comment if you work on ts in your project */
    // Steps:
    // 1.- create new folder with name "ts"
    // 2.- create new file .ts and remove comment in entry point
    //tsIndex: './src/assets/ts/index.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './assets/js/[name]-bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    compress: true,
    overlay: true,
    open: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|webm|mp4|woff)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 9000,
          },
        },
      },
      {
        test: /\.(jpg|png|svg|gif|webm|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name]-styles.css',
    }),
  ],
};
