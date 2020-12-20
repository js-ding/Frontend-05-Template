学习笔记

### 伪类：

- 行为：
:any-link
:link :visited
:hover
:active
:target
:focus
...

- 结构
:empty
:nth-child()
:nth-last-child()
:first-child :last-child :only-child
...

- 逻辑
:not()
:where :has

### 伪元素

::before
::after
::first-line: 本质是将第一行**文字**用一个<::first-line>将第一行括起来

    生效属性:
        font系列
        color系列
        background系列
        word-spacing
        letter-spacing
        text-decoration
        text-transform
        line-height

::first-letter: 本质是将第一个**文字**用一个<::first-line>将第一行括起来

    生效属性
        font系列
        color系列
        background系列
        text-decoratin
        text-transform
        letter-spacing
        word-spacing
        line-height
        float
        vertical-align
        盒模型：margin,padding,border
