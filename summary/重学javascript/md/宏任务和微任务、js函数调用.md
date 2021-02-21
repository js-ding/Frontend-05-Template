javascrip执行粒度（运行时）

粒度从上至下

- 宏任务
    
    传给jacascript引擎的任务


- 微任务（Promise）

    javascript引擎内部的任务，只有Promise会产生微任务

    // 图片


- 函数调用（Execution Context）

每个函数调用会形成一个调用上下文，多个函数调用形成了一个调用栈（Execution Context Stack）。

// 图片

1. code evaluation state

用于async和generator函数的，代码执行到哪保存的一个信息。

2. Function

由Function初始化的函数。

3. Script or Module

在script里面代码或者module里面的代码。

4. Generator

generator函数每次执行生成的隐藏信息。

5. Realm

保存所有使用内置对象的一个领域。

6. LexicalEnvironment

存放所有执行时东西。

    - this
    - new.target
    - super
    - 变量

7. VariableEnvironment

var声明变量时使用环境。

- 语句/声明（Completion Record）
- 表达式（Reference）
- 直接量/变量/this