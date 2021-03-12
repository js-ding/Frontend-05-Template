## Atom

    Grammar
        Literal
        Variable
        Keywords
        Whitespace
        Line Teminator
    
    Runtime
        Types
            Number
            String
            Boolean
            Null
            Undefined
            Symbol
            Object
        Execution Context


### Number

参考学习：[JavaScript类型：关于类型，有哪些你不知道的细节？](https://time.geekbang.org/column/article/78884)

> 0.1 + 0.2 === 0.3 false 问题

    这里0.1、0.2 是十进制表示，在计算时计算机会转换成二进制形式在参与计算，在转换中由于无法除尽，精度会丢失，计算结果也就不准确了

    二进制：ob 开头
    八进制：0o 开头
    十六进制：0x 开头

// 进制间的转换你知道吗？

### String

参考学习：[JavaScript类型：关于类型，有哪些你不知道的细节？](https://time.geekbang.org/column/article/78884)

- ASCII

    早起字符很少，只有127个。包括26个大写字母，26个小写字母，0-9数字，以及各种制表符、换行、控制符等等。（只能翻译英文）

- Unicode

    早期 0000~FFFF 两个字节，

- UCS
- GB
    - GB2312
    - GBK（GB13000）
    - GB18030
- ISO-8859
- BIG5
