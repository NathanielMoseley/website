const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the dist folder before each build
  },

  resolve: {
    alias: {
        '@js': path.join(__dirname, 'src/js'),
        '@css': path.join(__dirname, 'src/css'),
      '@images': path.join(__dirname, 'src/img'),
      '@components': path.join(__dirname, 'src/components'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      // define a relative or absolute path to entry templates for
      // automatically processing templates in all subdirs
      entry: 'src/pages/',
    outputPath: './',
      // - OR - define many templates manually
    //   entry: {
    //     // 'index' = output => dist/index.html
    //     index: 'src/index.html',
    //     // 'pages/about' = output => dist/pages/about.html
    //     about: 'src/about.html',
    //     // ...
    //   },
      js: {
        // output filename of compiled JavaScript, 
        // used if `inline` option is false (defaults)
        filename: 'js/[name].js',
        //inline: true, // inlines JS into HTML
      },
      css: {
        // output filename of extracted CSS,
        // used if `inline` option is false (defaults)
        filename: 'css/[name].css',
        //inline: true, // inlines CSS into HTML
      },
      preprocessor: 'ejs', // Enable built-in EJS support
    }),
  ],

  module: {
    rules: [
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      // images
      {
      test: /\.(png|jpe?g|ico|svg|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'img/[name][ext]',
      },
    },
    ],
  },
};
