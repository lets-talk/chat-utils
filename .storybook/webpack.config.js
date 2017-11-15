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
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    postcssflexbugsfixes,
                    require('postcss-cssnext')(
                      {
                        browsers: [
                          '>1%',
                          'last 3 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                      }
                    ),
                  ],
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
