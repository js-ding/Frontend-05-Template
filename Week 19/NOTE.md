学习笔记

发布系统

代码 == （发布工具） => 发布系统 ===> 线上服务系统 ===> 展示给用户

## 发布工具

参考代码Week 19/task/publish-tool

***上传代码到发布系统***

## 发布系统

参考代码Week 19/task/publish-server

***将上传代码写入到服务系统***

## 服务系统

参考代码Week 19\task\server

http://47.100.95.127:3333/

***后台服务，线上运行应用***

## node stream

[node stream](https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_class_stream_writable)

nodejs中流：读取流、写入流

- pipe

操作流是一个较麻烦的事情，pipe可以将一个流导入到另外一个流

## 多个文件打包

多个文件打包，需要先压缩成一个文件，服务端接受到压缩后的文件包，再做解压处理

- 压缩

[archive](https://www.npmjs.com/package/archiver)

- 解压

[unzipper](https://www.npmjs.com/package/unzipper)
