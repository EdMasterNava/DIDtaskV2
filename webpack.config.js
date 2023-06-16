const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    devtool: process.env.BUILD_ANALYZE ? 'source-map' : false,
    performance: {
        maxAssetSize: 9000000, // Adjust the maximum asset size limit (in bytes)
        maxEntrypointSize: 9000000, // Adjust the maximum entrypoint size limit (in bytes)
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].[contenthash].js'
    },
    devServer: {
        open: 'chrome'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser.js'
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')]
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    require.resolve('css-loader'),
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            lessOptions: {
                                modifyVars: {},
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [require.resolve('html-loader'), require.resolve('markdown-loader')]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            esModule: false,
                            limit: 10000,
                            name: 'static/[name].[contenthash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/, /\.mp4$/],
                use: [
                    {
                        loader: require.resolve('file-loader'),
                        options: {
                            esModule: false,
                            name: 'static/[name].[contenthash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        fallback: {
            assert: require.resolve('assert/'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify')
        }
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
}