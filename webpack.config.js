const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 修正了路径名错误，从 './scr/index.js' 修改为 './src/index.js'
  mode: "development", // 开发环境下不会压缩代码
  context: process.cwd(), // 上下文默认为当前目录(为了使用相对路径)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "monitor.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // 将 'contentBase' 替换为 'static.directory'
    }, // 服务器根目录
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      inject: "head", // 将打包后的js文件插入到head标签中
    }),
  ],
};
