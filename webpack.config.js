module.exports = {
  entry: './react/Router.js',
  output: {
    filename: 'dist/js/bundle.js'
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
      }, {
        test: /\.css$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
};

