"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Equals"] = '='] = "Equals";
    TokenType[TokenType["Greater"] = '>'] = "Greater";
    TokenType[TokenType["GreaterOrEqual"] = '>='] = "GreaterOrEqual";
    TokenType[TokenType["Less"] = '<'] = "Less";
    TokenType[TokenType["LessOrEqual"] = '<='] = "LessOrEqual";
    TokenType[TokenType["BraceClose"] = '}'] = "BraceClose";
    TokenType[TokenType["BraceOpen"] = '{'] = "BraceOpen";
    TokenType[TokenType["Comma"] = ','] = "Comma";
    TokenType[TokenType["Ellipsis"] = '...'] = "Ellipsis";
    TokenType[TokenType["Identifier"] = 'identifier'] = "Identifier";
    TokenType[TokenType["Plus"] = '+'] = "Plus";
    TokenType[TokenType["Slash"] = '/'] = "Slash";
    TokenType[TokenType["DoubleAsterisk"] = '**'] = "DoubleAsterisk";
    TokenType[TokenType["Percent"] = '%'] = "Percent";
    TokenType[TokenType["Asterisk"] = '*'] = "Asterisk";
    TokenType[TokenType["Minus"] = '-'] = "Minus";
    TokenType[TokenType["Number"] = 'number'] = "Number";
    TokenType[TokenType["ParenthesisClose"] = ')'] = "ParenthesisClose";
    TokenType[TokenType["ParenthesisOpen"] = '('] = "ParenthesisOpen";
    TokenType[TokenType["Terminator"] = 'terminator'] = "Terminator";
    TokenType[TokenType["Exclamation"] = '!'] = "Exclamation";
    TokenType[TokenType["String"] = 'string'] = "String";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=token-type.enum.js.map