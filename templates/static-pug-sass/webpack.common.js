const autoprefixer = require('autoprefixer');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: [
      './src/styles/app.scss',
      './src/scripts/app.js',
   ],
   output: {
      path: path.join(__dirname, 'dist'),
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: './src/templates/index.pug',
         filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
         filename: "bundle.css"
      })
   ],
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: ['file-loader'],
         },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env'],
            },
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
         },
         {
            test: /\.scss$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: 'bundle.css',
                  },
               },
               { loader: 'extract-loader' },
               { loader: 'css-loader' },
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: () => [autoprefixer()],
                  },
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sassOptions: {
                        includePaths: ['./node_modules'],
                     },
                  },
               },
            ],
         },
         {
            test: /\.pug$/,
            use: [
               {
                  loader: 'pug-loader',
               },
            ],
         },
      ],
   },
   optimization: {
      minimizer: [
         new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
               preset: ['default', { discardComments: { removeAll: true } }],
            }
         })
      ],
   },
};
