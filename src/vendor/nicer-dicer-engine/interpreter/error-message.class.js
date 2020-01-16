"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterpreterError = /** @class */ (function () {
    function InterpreterError(message, expression, stack) {
        if (stack === void 0) { stack = (new Error().stack); }
        this.message = message;
        this.expression = expression;
        this.stack = stack;
    }
    return InterpreterError;
}());
exports.InterpreterError = InterpreterError;
//# sourceMappingURL=error-message.class.js.map