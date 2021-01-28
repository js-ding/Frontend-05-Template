学习笔记

### YEOMAN

- 构建脚手架generator

https://yeoman.io/authoring/index.html

```sh
npm install -g yo

# /toolchain
npm install --save yeoman-generator

# 创建目录
# ...

# 运行
yo toolchain
```

package.json包名必须加上前缀  `generator-`  yo 才能运行。

- 用户输入交互

https://yeoman.io/authoring/user-interactions.html

- 文件交互

https://yeoman.io/authoring/file-system.html

- npm系统

https://yeoman.io/authoring/dependencies.html

- generator-vue

1. yeoman目录

/generator-vue

        ├───package.json
        └───generators/
            ├───app/
            │   └───index.js
            │   └───templates
                    ├───index.html
                    ├───main.js
                    ├───webpack.config.js
                    ├───Hello.vue


