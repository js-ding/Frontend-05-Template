const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development", // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: "./src/main.js", // string | object | array
    // 默认为 ./src
    // 这里应用程序开始执行
    // webpack 开始打包
    // output: {
    //     // webpack 如何输出结果的相关选项
    //     path: path.resolve(__dirname, "dist"), // string (default)
    //     // 所有输出文件的目标路径
    //     // 必须是绝对路径（使用 Node.js 的 path 模块）
    //     filename: "[name].js", // string (default)
    //     // entry chunk 的文件名模板
    //     publicPath: "/assets/", // string
    //     // 输出解析文件的目录，url 相对于 HTML 页面
    //     library: { // 这里有一种旧的语法形式可以使用（点击显示）
    //         type: "umd", // 通用模块定义
    //         // the type of the exported library
    //         name: "MyLibrary", // string | string[]
    //         // the name of the exported library

    //         /* Advanced output.library configuration (click to show) */
    //     },
    //     uniqueName: "my-application", // (defaults to package.json "name")
    //     // unique name for this build to avoid conflicts with other builds in the same HTML
    //     name: "my-config",
    //     // name of the configuration, shown in output
    //     /* 高级输出配置（点击显示） */
    //     /* Expert output configuration 1 (on own risk) */
    //     /* Expert output configuration 2 (on own risk) */
    // },
    module: {
        // 模块配置相关
        rules: [
            // 模块规则（配置 loader、解析器等选项）
            {
                // Conditions:
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        // 复制一份html在打包文件
        new CopyPlugin({
            patterns: [
                { from: "./src/*.html", to: '[name].[ext]' },
            ],
        }),
    ],
};
