"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParserError = /** @class */ (function () {
    function ParserError(message, token, stackTrace) {
        this.message = message;
        this.token = token;
        this.stackTrace = stackTrace;
    }
    return ParserError;
}());
exports.ParserError = ParserError;
//# sourceMappingURL=error-message.class.js.map