"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_definition_list_class_1 = require("./function-definition-list.class");
exports.DefaultFunctionDefinitions = new function_definition_list_class_1.FunctionDefinitionList();
exports.DefaultFunctionDefinitions['floor'] = function (interpreter, functionNode, errors) {
    return Math.floor(interpreter.evaluate(functionNode.getChild(0), errors));
};
exports.DefaultFunctionDefinitions['ceil'] = function (interpreter, functionNode, errors) {
    return Math.ceil(interpreter.evaluate(functionNode.getChild(0), errors));
};
exports.DefaultFunctionDefinitions['abs'] = function (interpreter, functionNode, errors) {
    return Math.abs(interpreter.evaluate(functionNode.getChild(0), errors));
};
exports.DefaultFunctionDefinitions['round'] = function (interpreter, functionNode, errors) {
    return Math.round(interpreter.evaluate(functionNode.getChild(0), errors));
};
exports.DefaultFunctionDefinitions['sqrt'] = function (interpreter, functionNode, errors) {
    return Math.sqrt(interpreter.evaluate(functionNode.getChild(0), errors));
};
//# sourceMappingURL=default-function-definitions.js.map