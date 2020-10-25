学习笔记

<Expression> ::= <AdditiveExpression><EOF>

<AdditiveExpression> ::=
    <MultiplicativeExpression>
    |<AdditiveExpression>+<MultiplicativeExpression>
    |<AdditiveExpression>-<MultiplicativeExpression>

<MultiplicativeExpress> ::=
    <Number>
    |<MultiplicativeExpression>*<Number>
    |<MultiplicativeExpression>/<Number>

- exec(): 返回正则检索结果数组。

- Regexp.lastIndex: 正则匹配下一个起始索引。