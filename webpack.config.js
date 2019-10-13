const path = require('path');

const createStyleLoaders = (isProduction) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: !isProduction,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('autoprefixer'), require('csswring')],
    },
  },
];

module.exports = (env) => ({
  mode: 'production',
  entry: ['./src/App.js'],
  output: {
    publicPath: '/',
    path: `${__dirname}/dist/`,
    filename: 'bundle.js',
  },
  resolve: {
    // importする拡張子の指定
    extensions: ['.js', '.scss', '.css'],
  },
  // loaderの設定
  module: {
    rules: [
      {
        test: /\.css$/,
        use: createStyleLoaders(env.production),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          ...createStyleLoaders(env.production),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !env.production,
              prependData: `@import "${path.resolve(
                  __dirname,
                  'src/lib/styles/_variables'
              )}";`,
              // sassOptions: {
              //   data: '@import "~/lib/styles/_variables.scss";',
              //   includePaths: [path.resolve(__dirname, "src/")]
              // }
            },
          },
        ],
      },
    ],
  },
});
