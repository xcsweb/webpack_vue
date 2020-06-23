const {resolve} =require("path");
const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin' );
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack =require("webpack");
const mode=process.env.NODE_ENV;
let styleLoader=null;
let extract=null;
if(mode==="development"){
    styleLoader="style-loader"
    extract= true;
}else{
    styleLoader=MiniCssExtractPlugin.loader;
    extract=false;
}
let styleArr=[ styleLoader,
    {loader:"css-loader",options: {
                            modules: true,
                            importLoaders: 1
    }},
    { loader: 'postcss-loader', options: { ident: 'postcss', plugins: () => [ require('postcss-preset-env')()  ] } }];
let styleArr1=[ styleLoader,
    "css-loader",
    "sass-loader"]
module.exports={
    mode:mode,
    entry:"./src/main.js",
    output:{
        filename:"js/[name].[hash:6].js",
        path:resolve(__dirname,"dist")
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    "vue-loader"
                ]
            },
            {
                oneOf:[
                    {
                        test:/\.css$/,
                        use:styleArr
                    },
                    {
                        test:/\.scss$/,
                        use:styleArr1
                    },
                    {
                        test:/\.ts$/,
                        use:[
                            "ts-loader"
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use:[
                            {
                                loader:'thread-loader',
                                options:{
                                    worker:2
                                }
                            },
                            {
                                loader:"babel-loader"
                            }
                        ]
                    },
                    
                    {
                        // 处理图片资源
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            // 关闭 es6 模块化
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    },
                    {
                        // 排除 css/js/html 资源
                        exclude: /\.(html|js|css|less|ts|scss|jpg|png|gif|vue)/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
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
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist','dist/css','dist/js']
        }),
        new MiniCssExtractPlugin({ 
            filename: './css/[name].[contenthash:6].css',
            chunkFilename: './css/[name].[contenthash:6].css',
        }), 
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        }),
        new webpack.SourceMapDevToolPlugin({}),
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    optimization: { 
        splitChunks: { chunks: 'all' },
        // 将当前模块的记录其他模块的 hash 单独打包为一个文件 runtime
        // 解决：修改 a 文件导致 b 文件的 contenthash 变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
        // 配置生产环境的压缩方案：js 和 css
        new TerserWebpackPlugin({
            // 开启缓存
            cache: true,
            // 开启多进程打包
            parallel: true,
            // 启动 source-map
            sourceMap: true
            })
        ]
    },
    // devtool:"eval-source-map",
    devtool:"source-map",
    devServer:{
        contentBase:resolve(__dirname,"dist"),
        compress:true,
        port:3000,
        // inline:true,
        hot:true,
        open:true
    }
}