const path = require('path');

module.exports = {
  entry: [
    path.join(process.cwd(), 'lib/index.js'),
  ],
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    filename: 'index.js',
  }, {}), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: process.env.NODE_ENV === 'development' ? '[name]--[local]--[hash:base64:8]' : '[hash:base64:5]',
            },
          },
          // { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      // The url-loader uses DataUrls. The file-loader emits files.
      {
        test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.ttf$/, loader: 'file-loader',
      },
      {
        test: /\.eot$/, loader: 'file-loader',
      },
      {
        test: /\.svg$/, loader: 'file-loader',
      },
    ],
  },
};
