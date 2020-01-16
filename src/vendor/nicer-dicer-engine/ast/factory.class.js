"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expression_node_class_1 = require("./expression-node.class");
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.create = function (type) {
        return new expression_node_class_1.ExpressionNode(type);
    };
    return Factory;
}());
exports.Factory = Factory;
//# sourceMappingURL=factory.class.js.map