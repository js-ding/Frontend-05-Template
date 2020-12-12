学习笔记

- url > http ==>

发送http请求，通过对响应报文的解析，获取到html字符模板

- html > parse ==>

解析html，解析出标签，形成一个基础的dom树结构

dom > css computing ==>

添加css属性，添加对应层级关系，形成CSSOM

dom with css > layout ==>

解析CSSOM，获取几何位置

dom with position > render ==> bitmap

得到渲染图层
