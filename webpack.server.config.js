/* eslint-disable no-process-env */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/services/graphql',
  node: false,
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  optimization: {
    // We no not want to minimize our code
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.js', '.json', '.gql', '.graphql']
  },
  externals: [nodeExternals(), 'aws-cdk'],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build-server'),
    filename: 'server.js',
    sourceMapFilename: 'server.map'
  }
};
