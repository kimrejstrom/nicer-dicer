"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var result_class_1 = require("./result.class");
var DiceResult = /** @class */ (function (_super) {
    __extends(DiceResult, _super);
    function DiceResult(expression, renderedExpression, total, successes, failures, errors) {
        var _this = _super.call(this, expression, renderedExpression, total) || this;
        _this.successes = successes;
        _this.failures = failures;
        _this.errors = errors;
        return _this;
    }
    return DiceResult;
}(result_class_1.Result));
exports.DiceResult = DiceResult;
//# sourceMappingURL=dice-result.class.js.map