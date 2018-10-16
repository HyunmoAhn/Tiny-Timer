const webpack = require('webpack');
const path = require('path');
const { spawn } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    timer: './app/page/timer.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/' : './',
  },
  target: 'electron-renderer',
  devServer: {
    compress: true,
    inline: true,
    lazy: false,
    contentBase: path.join(__dirname, 'build'),
    publicPath: 'http://localhost:3001/build',
    disableHostCheck: true, // do not use production
    historyApiFallback: true,
    hot: true,
    port: 3001,
    before() {
      console.log('Start Main Process...');
      spawn(
        'npm run',
        ['main'],
        { shell: true, env: process.env, stdio: 'inherit' },
      )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, '/app/page')],
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['timer'],
      filename: 'timer.html',
      template: path.join(__dirname, './app/page/timer.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  }
}
