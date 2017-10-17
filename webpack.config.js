module.exports = {
  entry: "./react/App.js",
  output: {
    filename: "dist/js/bundle.js"
  },
  module: {
    loaders: [
      {
      	test: /\.js$/, 
      	loader: 'babel-loader',
      	exclude: /node_modules/,
      	query: {
      		presets: ['es2015', 'react']
      	}
      }
    ]
  }
};

