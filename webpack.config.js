const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const config = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },
    entry: {
        index:"./src/index.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].js",
        publicPath: "/",
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath:"/"
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        host:"localhost",
        port:8080,
        open: true,
        hot: true,
    },
    resolve:{
        alias: {
            cssPath:path.resolve(__dirname,'src/css'),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),

        new MiniCssExtractPlugin({
            filename:"[name].css",
            chunkFilename: "common.css"
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html",
            hash:true
        })
    ]
};
module.exports = config;