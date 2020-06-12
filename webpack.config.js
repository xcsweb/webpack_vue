const {resolve} =require("path");
const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin' );
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack =require("webpack");
// const mode=process.argv[4]||"development";
const mode="production"
// process.env.NODE_ENV=mode;
// process.env.NODE_ENV
let styleLoader=null;
let extract=null;
if(mode==="development"){
    styleLoader="style-loader"
    extract= true;
}else{
    styleLoader=MiniCssExtractPlugin.loader;
    extract=false;
}
console.log(styleLoader)
let styleArr=[ styleLoader,
    'css-loader',
    { loader: 'postcss-loader', options: { ident: 'postcss', plugins: () => [ require('postcss-preset-env')()  ] } }]
module.exports={
    mode:mode,
    entry:"./src/main.js",
    output:{
        filename:"built.js",
        path:resolve(__dirname,"build/js")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:styleArr
            },
            {
                test:/\.scss$/,
                use:[
                    ...styleArr,
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
        new MiniCssExtractPlugin({ filename: 'css/built.css' }), 
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        }),
        new webpack.SourceMapDevToolPlugin({}),
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    optimization: { splitChunks: { chunks: 'all' }},
    devtool:"eval-source-map",
    devServer:{
        contentBase:resolve(__dirname,"build"),
        compress:true,
        port:3000,
        hot:true,
        open:true
    }
}