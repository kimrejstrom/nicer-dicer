"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("../lexer");
var error_message_class_1 = require("./error-message.class");
var BasicParser = /** @class */ (function () {
    function BasicParser(input) {
        if (this.isLexer(input)) {
            this.lexer = input;
        }
        else if (typeof input === 'string') {
            this.lexer = new lexer_1.DiceLexer(input);
        }
        else {
            throw new Error('Unrecognized input type. input must be of type \'Lexer | string\'.');
        }
    }
    BasicParser.prototype.isLexer = function (input) {
        return input.getNextToken;
    };
    BasicParser.prototype.expectAndConsume = function (result, expected, actual) {
        this.expect(result, expected, actual);
        return this.lexer.getNextToken();
    };
    BasicParser.prototype.expect = function (result, expected, actual) {
        actual = actual || this.lexer.peekNextToken();
        if (actual.type !== expected) {
            this.errorToken(result, expected, actual);
        }
        return actual;
    };
    BasicParser.prototype.errorToken = function (result, expected, actual) {
        var message = "Error at position " + actual.position + ".";
        message += " Expected token of type " + expected + ", found token of type " + actual.type + " of value \"" + actual.value + "\".";
        this.errorMessage(result, message, actual);
    };
    BasicParser.prototype.errorMessage = function (result, message, token) {
        result.errors.push(new error_message_class_1.ParserError(message, token, new Error().stack));
    };
    return BasicParser;
}());
exports.BasicParser = BasicParser;
//# sourceMappingURL=basic-parser.class.js.map