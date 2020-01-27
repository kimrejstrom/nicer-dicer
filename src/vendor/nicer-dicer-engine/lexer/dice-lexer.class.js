"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_character_stream_class_1 = require("./string-character-stream.class");
var token_class_1 = require("./token.class");
var token_type_enum_1 = require("./token-type.enum");
var DiceLexer = /** @class */ (function () {
    function DiceLexer(input) {
        this.numCharRegex = /[0-9]/;
        this.idCharRegex = /[a-zA-Z]/;
        if (this.isCharacterStream(input)) {
            this.stream = input;
        }
        else if (typeof input === 'string') {
            this.stream = new string_character_stream_class_1.StringCharacterStream(input);
        }
        else {
            throw new Error('Unrecognized input type. input must be of type \'CharacterStream | string\'.');
        }
    }
    DiceLexer.prototype.isCharacterStream = function (input) {
        return input.getCurrentCharacter;
    };
    DiceLexer.prototype.peekNextToken = function () {
        if (!this.nextToken) {
            this.nextToken = this.constructNextToken();
        }
        return this.nextToken;
    };
    DiceLexer.prototype.getNextToken = function () {
        if (this.nextToken) {
            this.currentToken = this.nextToken;
            this.nextToken = null;
        }
        else {
            this.currentToken = this.constructNextToken();
        }
        return this.currentToken;
    };
    DiceLexer.prototype.parseIdentifier = function () {
        var buffer = this.stream.getCurrentCharacter();
        // TODO: klnull?!
        while (this.stream.peekNextCharacter() && this.idCharRegex.test(this.stream.peekNextCharacter())) {
            buffer += this.stream.getNextCharacter();
        }
        return this.createToken(token_type_enum_1.TokenType.Identifier, buffer);
    };
    DiceLexer.prototype.parseString = function () {
        var buffer = this.stream.getCurrentCharacter();
        while (this.stream.peekNextCharacter()
            && this.stream.peekNextCharacter() !== '"'
            && this.stream.peekNextCharacter() !== '”'
            && this.stream.peekNextCharacter() !== '“') {
            buffer += this.stream.getNextCharacter();
        }
        if (this.stream.peekNextCharacter()) {
            buffer += this.stream.getNextCharacter();
        }
        return this.createToken(token_type_enum_1.TokenType.String, buffer);
    };
    DiceLexer.prototype.parseNumber = function () {
        var buffer = this.stream.getCurrentCharacter();
        var nextChar = this.stream.peekNextCharacter();
        var nextNextChar = this.stream.peekXCharactersForward(2);
        if (nextNextChar === '.') {
            // Ellipsis
            return this.createToken(token_type_enum_1.TokenType.Number, buffer);
        }
        else {
            // float
            while (nextChar === '.' || this.numCharRegex.test(nextChar)) {
                buffer += this.stream.getNextCharacter();
                nextChar = this.stream.peekNextCharacter();
                if (nextChar === '.') {
                    break;
                }
            }
            return this.createToken(token_type_enum_1.TokenType.Number, buffer);
        }
    };
    DiceLexer.prototype.parseEllipsis = function () {
        for (var x = 0; x < 2; x++) {
            if (this.stream.peekNextCharacter() !== '.') {
                throw new Error('Unexpected number of periods in ellipsis.');
            }
            this.stream.getNextCharacter();
        }
        return this.createToken(token_type_enum_1.TokenType.Ellipsis, '...');
    };
    DiceLexer.prototype.constructNextToken = function () {
        var curChar;
        while (curChar = this.stream.getNextCharacter()) {
            switch (true) {
                case this.idCharRegex.test(curChar): return this.parseIdentifier();
                case this.numCharRegex.test(curChar): return this.parseNumber();
                case curChar === '{': return this.createToken(token_type_enum_1.TokenType.BraceOpen, curChar);
                case curChar === '}': return this.createToken(token_type_enum_1.TokenType.BraceClose, curChar);
                case curChar === ',': return this.createToken(token_type_enum_1.TokenType.Comma, curChar);
                case curChar === '(': return this.createToken(token_type_enum_1.TokenType.ParenthesisOpen, curChar);
                case curChar === ')': return this.createToken(token_type_enum_1.TokenType.ParenthesisClose, curChar);
                case curChar === '=': return this.createToken(token_type_enum_1.TokenType.Equals, curChar);
                case curChar === '+': return this.createToken(token_type_enum_1.TokenType.Plus, curChar);
                case curChar === '/': return this.createToken(token_type_enum_1.TokenType.Slash, curChar);
                case curChar === '-': return this.createToken(token_type_enum_1.TokenType.Minus, curChar);
                case curChar === '%': return this.createToken(token_type_enum_1.TokenType.Percent, curChar);
                case curChar === '!': return this.createToken(token_type_enum_1.TokenType.Exclamation, curChar);
                case curChar === '"': return this.parseString();
                case curChar === '”': return this.parseString();
                case curChar === '“': return this.parseString();
                case curChar === '.': return this.parseEllipsis();
                case curChar === '*':
                    if (this.stream.peekNextCharacter() === '*') {
                        this.stream.getNextCharacter();
                        return this.createToken(token_type_enum_1.TokenType.DoubleAsterisk, curChar + this.stream.getCurrentCharacter());
                    }
                    else {
                        return this.createToken(token_type_enum_1.TokenType.Asterisk, curChar);
                    }
                case curChar === '>':
                    if (this.stream.peekNextCharacter() === '=') {
                        this.stream.getNextCharacter();
                        return this.createToken(token_type_enum_1.TokenType.GreaterOrEqual, curChar + this.stream.getCurrentCharacter());
                    }
                    else {
                        return this.createToken(token_type_enum_1.TokenType.Greater, curChar);
                    }
                case curChar === '<':
                    if (this.stream.peekNextCharacter() === '=') {
                        this.stream.getNextCharacter();
                        return this.createToken(token_type_enum_1.TokenType.LessOrEqual, curChar + this.stream.getCurrentCharacter());
                    }
                    else {
                        return this.createToken(token_type_enum_1.TokenType.Less, curChar);
                    }
                case /\W/.test(curChar):
                    // Ignore whitespace.
                    break;
                default: throw new Error("Unknown token: '" + curChar + "'.");
            }
        }
        // Terminator at end of stream.
        return this.createToken(token_type_enum_1.TokenType.Terminator);
    };
    DiceLexer.prototype.createToken = function (type, value) {
        var position = this.stream.getCurrentPosition();
        if (value) {
            position -= value.length - 1;
        }
        return new token_class_1.Token(type, position, value);
    };
    return DiceLexer;
}());
exports.DiceLexer = DiceLexer;
//# sourceMappingURL=dice-lexer.class.js.map