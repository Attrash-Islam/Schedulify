module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      library: 'JsSchedulify',
      libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
};
