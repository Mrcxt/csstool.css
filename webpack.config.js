const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //将html打包
const ExtractTextPlugin = require('extract-text-webpack-plugin') //打包的css拆分,将一部分抽离出来  
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index'),
    watch: true,
    output: {
        path: __dirname + 'dist',
        publicPath: '/dist/',
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            loader: 'babel-loader',
            query: {
                presets: [
                    ["@babel/env", {
                        "targets": {
                            "browsers": "last 2 chrome versions"
                        }
                    }]
                ]
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'), //[name] 默认  也可以自定义name  声明使用
        new HtmlWebpackPlugin({ //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
            file: 'index.html', //打造单页面运用 最后运行的不是这个
            template: 'src/index.html' //vue-cli放在跟目录下
        })
    ],
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        // contentBase: path.join('/dist/'),
        inline: true,
        host: 'localhost',
        port: 7777,
    }
};