"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringCharacterStream = /** @class */ (function () {
    function StringCharacterStream(input) {
        this.input = input;
        this.index = -1;
    }
    StringCharacterStream.prototype.getCurrentPosition = function () {
        return this.index;
    };
    StringCharacterStream.prototype.getNextCharacter = function () {
        this.index = Math.min(this.index + 1, this.input.length);
        if (this.index >= this.input.length) {
            return null;
        }
        return this.input[this.index];
    };
    StringCharacterStream.prototype.getCurrentCharacter = function () {
        if (this.index < 0 || this.index >= this.input.length) {
            return null;
        }
        return this.input[this.index];
    };
    StringCharacterStream.prototype.peekNextCharacter = function () {
        if (this.index >= this.input.length) {
            return null;
        }
        return this.input[this.index + 1];
    };
    return StringCharacterStream;
}());
exports.StringCharacterStream = StringCharacterStream;
//# sourceMappingURL=string-character-stream.class.js.map