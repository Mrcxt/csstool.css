/*
 * @Description: 
 * @Author: @虾哔哔
 * @Date: 2019-08-15 17:14:49
 * @LastEditTime: 2019-08-16 11:18:04
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'



const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //定义输出文件夹dist路径
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            file: 'index.html', //
            template: 'src/index.html' //
        }),
        new MiniCssExtractPlugin({
            filename: "css/csstool.css",
        })
    ],
    module: {
        rules: [{
            test: /\.(c|le)ss$/,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: "postcss-loader", //
                    options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => []
                    }
                },
                'less-loader',
            ],
        }]
    }
};