"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_class_1 = require("./factory.class");
var node_attributes_class_1 = require("./node-attributes.class");
var ExpressionNode = /** @class */ (function () {
    function ExpressionNode(type, parent) {
        if (parent === void 0) { parent = null; }
        this.type = type;
        this.parent = parent;
    }
    ExpressionNode.prototype.copy = function () {
        var _this = this;
        var copy = factory_class_1.Factory.create(this.type);
        if (this.attributes) {
            Object.keys(this.attributes).forEach(function (attr) {
                copy.setAttribute(attr, _this.attributes[attr]);
            });
        }
        if (this.children) {
            this.children.forEach(function (child) {
                copy.addChild(child.copy());
            });
        }
        return copy;
    };
    ExpressionNode.prototype.addChild = function (node) {
        return this.insertChild(node);
    };
    ExpressionNode.prototype.insertChild = function (node, index) {
        if (node) {
            if (node === this) {
                throw new Error('Cannot add a node as a child of itself.');
            }
            if (!this.children) {
                this.children = [];
            }
            this.children.splice(index || this.children.length, 0, node);
            node.parent = this;
        }
        return node;
    };
    ExpressionNode.prototype.clearChildren = function () {
        this.children = undefined;
    };
    ExpressionNode.prototype.removeChild = function (expression) {
        if (expression.parent !== this) {
            return null;
        }
        this.children.splice(this.children.indexOf(expression, 1));
        return expression;
    };
    ExpressionNode.prototype.getParent = function () {
        return this.parent;
    };
    ExpressionNode.prototype.getChild = function (index) {
        if (!this.children || this.children.length <= index) {
            throw new Error("Child node at index " + index + " does not exist.");
        }
        return this.children[index];
    };
    ExpressionNode.prototype.getChildCount = function () {
        return this.children ? this.children.length : 0;
    };
    ExpressionNode.prototype.forEachChild = function (fn) {
        var children = __spreadArrays(this.children || []);
        children.forEach(fn);
    };
    ExpressionNode.prototype.getAttribute = function (key) {
        return this.attributes ? this.attributes[key] : undefined;
    };
    ExpressionNode.prototype.setAttribute = function (key, value) {
        if (!this.attributes) {
            this.attributes = new node_attributes_class_1.NodeAttributes();
        }
        this.attributes[key] = value;
        return this;
    };
    ExpressionNode.prototype.toJSON = function () {
        var _this = this;
        var keys = Object.keys(this).filter(function (k) { return k !== 'parent'; });
        var obj = {};
        keys.forEach(function (k) { return obj[k] = _this[k]; });
        return obj;
    };
    return ExpressionNode;
}());
exports.ExpressionNode = ExpressionNode;
//# sourceMappingURL=expression-node.class.js.map