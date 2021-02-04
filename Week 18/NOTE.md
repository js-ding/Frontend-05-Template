学习笔记

## mocha

测试工具

[mocha](https://mochajs.org/)

参考代码Week18/task/test-demo

```sh
npm i --save-dev mocha
```

- 配合babel

[@babel/register](https://babeljs.io/docs/en/babel-register#docsNav)

解决import语句问题，mocha是设计本身是基于nodejs，导入导出采用commonJS规范

参考代码Week18/task/test-demo02

```sh
npm i --save-dev @babel/register @babel/core
```

## code coverage 代码覆盖率

- nyc

[nyc](https://www.npmjs.com/package/nyc)

参考代码Week18/task/test-demo03

```sh
npm i --save-dev nyc
```

疑问：import语句使用报错，在脚本运行时加上  `--require @babel/register`  解决,为什么要去掉特意去安装istanbul编译呢？

```sh
npm install --save-dev babel-plugin-istanbul @istanbuljs/nyc-config-babel
```

```.babelrc
{
  "env": {
    "test": {
      "plugins": [ "istanbul" ]
    }
  }
}
```

```.nycrc
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```

## 实战：编写html-parser用例

参考代码Week18/task/html-parser

1. 开发时使用npm run test跑用例，查看用例是否可以通过。
2. 使用npm run coverage 跑覆盖率，根据代码覆盖情况针对对应代码编写用例

## 集成测试工具到脚手架

参考代码Week18/task/generators
