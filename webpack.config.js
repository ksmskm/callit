module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "dist/js/bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};