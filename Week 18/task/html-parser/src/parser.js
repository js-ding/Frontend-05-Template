let stack = null;
let currentToken = null;
let currentAttribute = null;

function emit(token) {
    // console.log('token:', token);
    const top = stack[stack.length - 1];
    let currentTextNode = null;
    if (token.type === 'text') {
        currentTextNode = {
            type: 'text',
            content: '',
        };
        top.children.push(currentTextNode);
        currentTextNode.content += token.content;
    }
    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            tagName: '',
            children: [],
            attributes: [],
            parent: null,
        };
        element.tagName = token.tagName;
        for (const p in token) {
            if (['type', 'tagName', 'isSelfClosing'].indexOf(p) > -1) continue;
            element.attributes.push({
                name: p,
                value: token[p],
            });
        }

        top.children.push(element);
        element.parent = top;

        // 至于最顶层
        if (!token.isSelfClosing) {
            stack.push(element);
        }

        currentTextNode = null;
    }
    if (token.type === 'endTag') {
        if (top.tagName === token.tagName) {

            stack.pop();
        }

        currentTextNode = null;
    }
}

const EOF = Symbol('EOF'); // EOF: End Of File.

function data(c) {
    if (c === '<') {
        // '<div' ------ '<'
        return tagOpen;
    } else if (c === EOF) {
        emit({ type: 'EOF' });
        return;
    } else {
        emit({
            type: 'text',
            content: c,
        });
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        // </div ------- </
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        // <div -------- div
        currentToken = {
            type: 'startTag',
            tagName: '',
        };
        return tagName(c);
    } else {
        // 文档节点 !
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: '',
        };
        return tagName(c);
    };
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        // 标签属性
        return beforeAttributeName;
    } else if (c === '/') {
        // 字母后面紧接 /
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else {
        // 疑问
        return tagName;
    }
}

function beforeAttributeName(c) {
    // charset="UTF-8">
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>' || c === '/' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        // 属性名第一位 = ，抛错
    } else {
        currentAttribute = {
            name: '',
            value: '',
        };
        return attributeName(c);
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        if (currentAttribute.name && !Boolean(currentAttribute.value)) {
            currentToken[currentAttribute.name] = true;
        }
        // 属性结束
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '\u0000') {
        // 空字符
    } else if (c === '\'' || c === '\"' || c === '<') {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName;
    } else if (c === '\"') {
        return doubleQuotedAttributeValue;
    } else if (c === '\'') {
        return singleQuotedAttributeValue;
    } else if (c === '>') {

    } else {
        return unQuotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function unQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === '\u0000') {

    } else if (c === '\"' || c === '\'' || c === '<' || c === '=' || c === '`' || c === EOF) {

    } else {
        currentAttribute.value += c;
        return unQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else {
        currentAttribute.value += c;
        return afterQuotedAttributeValue;
    }
}

function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else {

    }
}

/**
 * 
 * @param {string} html
 * <html></html> 开始标签、结束标签
 * <img/> 自封闭标签
 */
// function parserHtml(html) {
module.exports.parserHtml = function parserHtml(html) {
    stack = [{ type: 'document', children: [] }];
    let state = data;
    for (const c of html) {
        state = state(c);
    }
    state = state(EOF);
    // console.log('stack:', stack);
    return stack[0];
}

// parserHtml('<img alt="abc" src />')
// parserHtml('<a href>风语说</a>')
