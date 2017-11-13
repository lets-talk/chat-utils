const path = require('path');
// webpack.config.js
module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
            ],
          },
          {
            test: /\.scss$/,
            include: path.join(__dirname, '../packages'),
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            use: {
              loader: 'url-loader'
            }
          }
        ]
    }
};
