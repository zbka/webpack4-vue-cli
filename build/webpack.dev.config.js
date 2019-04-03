'use strict'
const path = require('path');
const chalk = require('chalk');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    path: resolve('dist'),
    filename:'js/[name].[hash].js'
  },
  // output:{
  //   publicPath: './' //这里要放的是静态资源CDN的地址(一般只在生产环境下配置)
  // },
  resolve: {
    extensions: [".js",".css",".json"],
    alias: {} //配置别名可以加快webpack查找模块的速度
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
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
        // include: [path.resolve(__dirname, '../src')], //限制范围，提高打包速度
      },
      {
        test:/\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
  devtool: 'eval-source-map', // 指定加source-map的方式
  devServer: {
    inline:true,//打包后加入一个websocket客户端
    hot:true,//热加载
    contentBase: path.join(__dirname, "..", "dist"), //静态文件根目录
    port: 3824, // 端口
    host: 'localhost',
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://10.1.249.143:6688/NetXpert',
        secure: false
      }
    },
    compress: false // 服务器返回浏览器的时候是否启动gzip压缩
  },
  optimization: { //webpack4.x的最新优化配置项，用于提取公共代码
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  },
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll:1000 //每秒询问的文件变更的次数
  },
  plugins: [
    new VueLoaderPlugin(),
    // 多入口的html文件用chunks这个参数来区分
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src','index.html'),
      filename:'index.html',
      chunks:['index', 'common'],
      vendor: './js/vendor.dll.js', //与dll配置文件中output.fileName对齐
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
      filename: "css/[name].[chunkHash].css",
      publicPath: '/',
      chunkFilename: "[id].css"//异步加载的模块是要以文件形式加载哦，所以这时生成的文件名是以chunkname配置的
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.HotModuleReplacementPlugin(), //HMR
    new webpack.NamedModulesPlugin(), // HMR
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '..', 'dist/js', 'manifest.json')
    }),
  ]
}