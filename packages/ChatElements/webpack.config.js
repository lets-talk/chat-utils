const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(process.cwd(), 'lib/index.js'),
  ],
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: 'LetsTalkToolkitChatElements',
  }, {}), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        include: path.join(__dirname, 'lib'),
        use: {
          loader: 'babel-loader',
        },
        query: {
          presets: ['es2015', 'react', 'stage-3'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true, // default is false
                sourceMap: true,
                importLoaders: 1,
                localIdentName: process.env.NODE_ENV === 'development' ? '[name]' : '[hash:base64:5]',
              },
            },
            // { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
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
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      mangle: false,
      beautify: false,
      comments: false,
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
    }),
  ],
  externals: [
    'material-ui',
    {
      'react-router-dom': {
        root: 'react-router-dom',
        commonjs2: 'react-router-dom',
        commonjs: ['react-router-dom'],
        amd: 'react-router-dom',
      },
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: ['react'],
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: ['react-dom'],
        amd: 'react-dom',
      },
    },
  ],
};
