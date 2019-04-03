const path = require('path');
const chalk = require('chalk');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssLoader = { loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'} };
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        index: './src/index.js',
    },
    output:{
        path: resolve('admin-web'),
        filename:'js/[name].[chunkhash].js'
    },
    resolve: {
        extensions: [".js",".css",".json"],
        alias: {} //配置别名可以加快webpack查找模块的速度
    },
    optimization: { //webpack4.x的最新优化配置项，用于提取公共代码
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            commons: {
                chunks: "all",
                name: "commons",
                minChunks: 2,
                minSize: 1,
                maxInitialRequests: 5, // The default limit is too small to showcase the effect
                // minSize: 0, // This is example is too small to create commons chunks
                reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
            },
            vendors: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                priority: 10
            },
          }
        }
    },
    module: {
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        rules:[
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [resolve('src')],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [CssLoader, 'css-loader', 'postcss-loader'],
            // include: [path.resolve(__dirname, '../src')], //限制范围，提高打包速度
          },
          {
            test:/\.scss$/,
            use: [CssLoader, 'css-loader', 'postcss-loader', 'sass-loader'],
            include: [path.resolve(__dirname, '../src')],
            exclude: /node_modules/
          },
          {
              test: /\.js?$/,
              loader: 'happypack/loader?id=happy-babel-js',
              include: [resolve('src')],
              exclude: /node_modules/,
          },
          { 
          // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:7].[ext]', // 图片输出的路径
                outputPath: 'images/',
                limit: 10 * 1024
              }
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:7].[ext]',
              outputPath: 'media/'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              name: '[name].[hash:7].[ext]',
              outputPath: 'font/'
            }
          }
        ]
      },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', 'static'),
                to: path.join(__dirname,  '..', 'admin-web', 'static'),
                ignore: ['.*']
            }
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src','index.html'),
            filename:'index.html',
            chunks:['index', 'common', 'vendor', 'runtime'],
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
          }),
        new HappyPack({
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            publicPath: '/',
            // chunkFilename: "[id].css"//异步加载的模块是要以文件形式加载哦，所以这时生成的文件名是以chunkname配置的
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),
        new CleanWebpackPlugin(['admin-web'], {
            root: path.join(__dirname, '..'),
            verbose: true,
            dry:  false
        }),
        new OptimizeCSSPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
    ]
}