学习笔记

- 运算符

new Obj() > new Obj

fn() > fn().a

new.target
> new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的。在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined。

- 宏任务

传给javascript引擎的任务

- 微任务

在javascript内部的任务
