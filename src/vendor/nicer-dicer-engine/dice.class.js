"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("./generator");
var dice_interpreter_class_1 = require("./interpreter/dice-interpreter.class");
var dice_lexer_class_1 = require("./lexer/dice-lexer.class");
var dice_parser_class_1 = require("./parser/dice-parser.class");
var Dice = /** @class */ (function () {
    function Dice(functions, randomProvider, options) {
        this.functions = functions;
        this.randomProvider = randomProvider;
        this.options = options;
    }
    Dice.prototype.roll = function (input) {
        var lexer = this.createLexer(input);
        var parser = this.createParser(lexer);
        var interpreter = this.createInterpreter();
        var parseResult = parser.parse();
        return interpreter.interpret(parseResult.root);
    };
    Dice.prototype.createLexer = function (input) {
        return new dice_lexer_class_1.DiceLexer(input);
    };
    Dice.prototype.createParser = function (lexer) {
        return new dice_parser_class_1.DiceParser(lexer);
    };
    Dice.prototype.createInterpreter = function () {
        return new dice_interpreter_class_1.DiceInterpreter(this.functions, this.randomProvider, this.createGenerator(), this.options);
    };
    Dice.prototype.createGenerator = function () {
        return new generator_1.DiceGenerator(this.options);
    };
    return Dice;
}());
exports.Dice = Dice;
//# sourceMappingURL=dice.class.js.map