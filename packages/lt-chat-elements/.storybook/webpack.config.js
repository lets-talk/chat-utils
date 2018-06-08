const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  }
};

// Export a function. Accept the base config as the only param.
// module.exports = (storybookBaseConfig, configType) => {
//   // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
//   // You can change the configuration based on that.
//   // 'PRODUCTION' is used when building the static version of storybook.
//
//   // Make whatever fine-grained changes you need
//   storybookBaseConfig.module.rules.push({
//     test: /\.scss$/,
//     loaders: ["style-loader", "css-loader", "sass-loader"]
//   });
//   storybookBaseConfig.module.rules.push({
//     test: /\.(jpg|png|gif|svg)$/,
//     use: {
//       loader: 'url-loader',
//     },
//   });
//
//   // storybookBaseConfig.plugins = storybookBaseConfig.plugins.map(plugin => {
//   //   if (plugin.constructor.name === 'HtmlWebpackPlugin') {
//   //     console.log('Plugin:', plugin);
//   //     const newPlugin = Object.assign({}, plugin);
//   //     newPlugin.options.chunksSortMode = 'none';
//   //     console.log('newPlugin:', newPlugin);
//   //     return newPlugin;
//   //   }
//   //   return plugin
//   // })
//
//   // Return the altered config
//   return storybookBaseConfig;
// };
