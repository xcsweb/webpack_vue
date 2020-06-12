const {resolve} =require("path");
const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack =require("webpack");
module.exports={
    mode:"development",
    entry:"./src/main.js",
    output:{
        filename:"built.js",
        path:resolve(__dirname,"build/js")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.vue$/,
                use:[
                    "vue-loader"
                ]
            },
            {
                test:/\.ts$/,
                use:[
                    "ts-loader"
                ]
            }
        ]
    },
    resolve:{
        extensions:['.js','.ts','.vue','.json'],
        alias:{
            "@":path.resolve(__dirname,"./src")
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    devtool:"eval-source-map",
    devServer:{
        contentBase:resolve(__dirname,"build"),
        compress:true,
        port:3000,
        hot:true,
        open:true
    }
}