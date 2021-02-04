const assert = require('assert');
const util = require('util');

import { parserHtml } from '../src/parser';

describe('parser html', () => {
    it('<a></a>', () => {
        const tree = parserHtml('<a></a>');
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'a');
        assert.strictEqual(tree.children[0].children.length, 0);
    });
    it('<a href="//47.100.95.127"></a>', () => {
        const tree = parserHtml('<a href="//47.100.95.127"></a>');
        assert.strictEqual(tree.children[0].attributes.length, 1);
    });
    it('<a href="//47.100.95.127">风语说</a>', () => {
        const tree = parserHtml('<a href="//47.100.95.127">风语说</a>');
        assert.strictEqual(tree.children[0].children.length, 3);
    });
    it('<a href=\'//47.100.95.127\'>风语说</a>', () => {
        const tree = parserHtml('<a href=\'//47.100.95.127\'>风语说</a>');
        assert.strictEqual(tree.children[0].children.length, 3);
    });
    it('<a   href=\'//47.100.95.127\'>风语说</a>', () => {
        const tree = parserHtml('<a   href=\'//47.100.95.127\'>风语说</a>');
        assert.strictEqual(tree.children[0].children.length, 3);
    });
    it('<a   href=\'//47.100.95.127\' class="a">风语说</a>', () => {
        const tree = parserHtml('<a   href=\'//47.100.95.127\' class="a">风语说</a>');
        assert.strictEqual(tree.children[0].attributes.length, 2);
    });
    it('<a href>风语说</a>', () => {
        const tree = parserHtml('<a href>风语说</a>');
        assert.strictEqual(tree.children[0].attributes.length, 1);
    });
    it('<a href={href}>风语说</a>', () => {
        const tree = parserHtml('<a href={href}>风语说</a>');
        assert.strictEqual(tree.children[0].attributes.length, 1);
    });
    it('<img/>', () => {
        const tree = parserHtml('<img/>');
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'img');
        assert.strictEqual(tree.children[0].children.length, 0);
        assert.strictEqual(tree.children[0].attributes.length, 0);
    });
    it('<img src="abc" alt="abc" />', () => {
        const tree = parserHtml('<img src="abc" alt="abc" />');
        assert.strictEqual(tree.children[0].attributes.length, 2);
    });
    it('<img alt="abc" src />', () => {
        const tree = parserHtml('<img alt="abc" src />');
        console.log(util.inspect(tree, { depth: null }))
        assert.strictEqual(tree.children[0].attributes.length, 2);
    });
    it('<img alt="abc" src={src} />', () => {
        const tree = parserHtml('<img alt="abc" src={src} />');
        console.log(util.inspect(tree, { depth: null }))
        assert.strictEqual(tree.children[0].attributes.length, 2);
    });
});

