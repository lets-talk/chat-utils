module.exports = {  
  entry: './index.ts',
  output: {
    filename: 'dist/bundle.js',
    library: 'Availability',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      }
    ]
  }
}

