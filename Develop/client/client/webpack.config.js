const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //generates HTML file with script tags
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body'
      }),
      //generates web app manifest file w/ metadata and assets
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'JATE',
        description: 'A text editor for your text use',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      }),
      //generates service worker file + inject to build
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
      })
    ],

    module: {
      rules: [
        {
          //css + style loader
          test: /\.css$/i,
          use: [
          'style-loader', 
          'css-loader'
        ]
        },
        {
          //babel loader
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
              // plugins: [
              //   '@babel/plugin-proposal-object-rest-spread', 
              //   '@babel/transform-runtime'
              // ],
            }
          }
        }
      ]
    }
  };
};