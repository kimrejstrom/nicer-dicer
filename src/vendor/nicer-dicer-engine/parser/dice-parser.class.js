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
var Ast = require("../ast");
var lexer_1 = require("../lexer");
var basic_parser_class_1 = require("./basic-parser.class");
var parse_result_class_1 = require("./parse-result.class");
var BooleanOperatorMap = {};
BooleanOperatorMap[lexer_1.TokenType.Equals] = Ast.NodeType.Equal;
BooleanOperatorMap[lexer_1.TokenType.Greater] = Ast.NodeType.Greater;
BooleanOperatorMap[lexer_1.TokenType.Less] = Ast.NodeType.Less;
BooleanOperatorMap[lexer_1.TokenType.GreaterOrEqual] = Ast.NodeType.GreaterOrEqual;
BooleanOperatorMap[lexer_1.TokenType.LessOrEqual] = Ast.NodeType.LessOrEqual;
var AddOperatorMap = {};
AddOperatorMap[lexer_1.TokenType.Plus] = Ast.NodeType.Add;
AddOperatorMap[lexer_1.TokenType.Minus] = Ast.NodeType.Subtract;
var MultiOperatorMap = {};
MultiOperatorMap[lexer_1.TokenType.DoubleAsterisk] = Ast.NodeType.Exponent;
MultiOperatorMap[lexer_1.TokenType.Asterisk] = Ast.NodeType.Multiply;
MultiOperatorMap[lexer_1.TokenType.Slash] = Ast.NodeType.Divide;
MultiOperatorMap[lexer_1.TokenType.Percent] = Ast.NodeType.Modulo;
var DiceParser = /** @class */ (function (_super) {
    __extends(DiceParser, _super);
    function DiceParser(input) {
        return _super.call(this, input) || this;
    }
    DiceParser.prototype.parse = function () {
        var result = new parse_result_class_1.ParseResult();
        result.root = this.parseExpression(result);
        return result;
    };
    DiceParser.prototype.parseExpression = function (result) {
        var root = this.parseSimpleExpression(result);
        var tokenType = this.lexer.peekNextToken().type;
        if (Object.keys(BooleanOperatorMap).indexOf(tokenType.toString()) > -1) {
            var newRoot = Ast.Factory.create(BooleanOperatorMap[tokenType]);
            this.lexer.getNextToken();
            newRoot.addChild(root);
            newRoot.addChild(this.parseSimpleExpression(result));
            root = newRoot;
        }
        return root;
    };
    DiceParser.prototype.parseSimpleExpression = function (result) {
        var tokenType = this.lexer.peekNextToken().type;
        if (Object.keys(AddOperatorMap).indexOf(tokenType.toString()) > -1) {
            this.lexer.getNextToken();
        }
        var root = this.parseTerm(result);
        if (tokenType === lexer_1.TokenType.Minus) {
            var negateNode = Ast.Factory.create(Ast.NodeType.Negate);
            negateNode.addChild(root);
            root = negateNode;
        }
        tokenType = this.lexer.peekNextToken().type;
        while (Object.keys(AddOperatorMap).indexOf(tokenType.toString()) > -1) {
            var newRoot = Ast.Factory.create(AddOperatorMap[tokenType]);
            newRoot.addChild(root);
            // Consume the operator.
            this.lexer.getNextToken();
            newRoot.addChild(this.parseTerm(result));
            root = newRoot;
            tokenType = this.lexer.peekNextToken().type;
        }
        return root;
    };
    DiceParser.prototype.parseTerm = function (result) {
        var root = this.parseFactor(result);
        var tokenType = this.lexer.peekNextToken().type;
        while (Object.keys(MultiOperatorMap).indexOf(tokenType.toString()) > -1) {
            var newRoot = Ast.Factory.create(MultiOperatorMap[tokenType]);
            newRoot.addChild(root);
            // Consume the operator.
            this.lexer.getNextToken();
            newRoot.addChild(this.parseFactor(result));
            root = newRoot;
            tokenType = this.lexer.peekNextToken().type;
        }
        return root;
    };
    DiceParser.prototype.parseFactor = function (result) {
        var root;
        var token = this.lexer.peekNextToken();
        switch (token.type) {
            case lexer_1.TokenType.Identifier:
                if (token.value === 'd' || token.value === 'D' || token.value === 'dF') {
                    root = this.parseDice(result);
                }
                else {
                    root = this.parseFunction(result);
                }
                break;
            case lexer_1.TokenType.ParenthesisOpen:
                root = this.parseBracketedExpression(result);
                if (this.lexer.peekNextToken().type === lexer_1.TokenType.Identifier) {
                    root = this.parseDice(result, root);
                }
                break;
            case lexer_1.TokenType.BraceOpen:
                root = this.parseGroup(result);
                break;
            case lexer_1.TokenType.Number:
                var number = this.parseNumber(result);
                if (this.lexer.peekNextToken().type !== lexer_1.TokenType.Identifier) {
                    root = number;
                }
                else {
                    root = this.parseDice(result, number);
                }
                break;
            case lexer_1.TokenType.String:
                root = this.parseString(result);
                break;
            default: this.errorToken(result, lexer_1.TokenType.Number, token);
        }
        return root;
    };
    DiceParser.prototype.parseSimpleFactor = function (result) {
        var token = this.lexer.peekNextToken();
        switch (token.type) {
            case lexer_1.TokenType.Number: return this.parseNumber(result);
            case lexer_1.TokenType.ParenthesisOpen: return this.parseBracketedExpression(result);
            case lexer_1.TokenType.Identifier: return Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', Number(1));
            default: this.errorToken(result, lexer_1.TokenType.Number, token);
        }
    };
    DiceParser.prototype.parseFunction = function (result) {
        var functionName = this.expectAndConsume(result, lexer_1.TokenType.Identifier);
        var root = Ast.Factory.create(Ast.NodeType.Function)
            .setAttribute('name', functionName.value);
        this.expectAndConsume(result, lexer_1.TokenType.ParenthesisOpen);
        // Parse function arguments.
        var token = this.lexer.peekNextToken();
        if (token.type !== lexer_1.TokenType.ParenthesisClose) {
            root.addChild(this.parseExpression(result));
            while (this.lexer.peekNextToken().type === lexer_1.TokenType.Comma) {
                this.lexer.getNextToken(); // Consume the comma.
                root.addChild(this.parseExpression(result));
            }
        }
        this.expectAndConsume(result, lexer_1.TokenType.ParenthesisClose);
        return root;
    };
    DiceParser.prototype.parseString = function (result) {
        var string = this.expectAndConsume(result, lexer_1.TokenType.String);
        var root = Ast.Factory.create(Ast.NodeType.String)
            .setAttribute('value', string.value.replace(/["”“]/gi, ''));
        return root;
    };
    DiceParser.prototype.parseNumber = function (result) {
        var numberToken = this.lexer.getNextToken();
        return Ast.Factory.create(Ast.NodeType.Number)
            .setAttribute('value', Number(numberToken.value));
    };
    DiceParser.prototype.parseBracketedExpression = function (result) {
        this.lexer.getNextToken(); // Consume the opening bracket.
        var root = this.parseExpression(result);
        this.expectAndConsume(result, lexer_1.TokenType.ParenthesisClose);
        return root;
    };
    DiceParser.prototype.parseGroup = function (result) {
        this.lexer.getNextToken(); // Consume the opening brace.
        var root = Ast.Factory.create(Ast.NodeType.Group);
        // Parse group elements.
        var token = this.lexer.peekNextToken();
        if (token.type !== lexer_1.TokenType.BraceClose) {
            do {
                if (this.lexer.peekNextToken().type === lexer_1.TokenType.Comma) {
                    this.lexer.getNextToken(); // Consume the comma.
                }
                var exp = this.parseExpression(result);
                if (this.lexer.peekNextToken().type === lexer_1.TokenType.Ellipsis) {
                    exp = this.parseRepeat(result, exp);
                }
                root.addChild(exp);
            } while (this.lexer.peekNextToken().type === lexer_1.TokenType.Comma);
        }
        this.expectAndConsume(result, lexer_1.TokenType.BraceClose);
        return this.parseGroupModifiers(result, root);
    };
    DiceParser.prototype.parseRepeat = function (result, lhs) {
        this.lexer.getNextToken(); // Consume the ellipsis.
        var root = Ast.Factory.create(Ast.NodeType.Repeat);
        root.addChild(lhs);
        root.addChild(this.parseExpression(result));
        return root;
    };
    DiceParser.prototype.parseDice = function (result, rollTimes) {
        var root = this.parseDiceRoll(result, rollTimes);
        root = this.parseDiceModifiers(result, root);
        return root;
    };
    DiceParser.prototype.parseDiceRoll = function (result, rollTimes) {
        if (!rollTimes) {
            rollTimes = this.parseSimpleFactor(result);
        }
        var token = this.expectAndConsume(result, lexer_1.TokenType.Identifier);
        var root = Ast.Factory.create(Ast.NodeType.Dice);
        root.addChild(rollTimes);
        switch (token.value) {
            case 'd':
            case 'D':
                var sidesToken = this.expectAndConsume(result, lexer_1.TokenType.Number);
                root.addChild(Ast.Factory.create(Ast.NodeType.DiceSides))
                    .setAttribute('value', Number(sidesToken.value));
                break;
            case 'dF':
                root.addChild(Ast.Factory.create(Ast.NodeType.DiceSides))
                    .setAttribute('value', 'fate');
                break;
        }
        return root;
    };
    DiceParser.prototype.parseExplode = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.Explode);
        root.setAttribute('compound', false);
        root.setAttribute('penetrate', false);
        if (lhs) {
            root.addChild(lhs);
        }
        this.lexer.getNextToken();
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Exclamation) {
            root.setAttribute('compound', true);
            this.lexer.getNextToken(); // Consume second !.
        }
        token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            if (token.value === 'p') {
                root.setAttribute('penetrate', true);
                this.lexer.getNextToken(); // Consume p.
            }
        }
        var tokenType = this.lexer.peekNextToken().type;
        if (Object.keys(BooleanOperatorMap).indexOf(tokenType.toString()) > -1) {
            root.addChild(this.parseCompareModifier(result));
        }
        return root;
    };
    DiceParser.prototype.parseCritical = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.Critical);
        root.setAttribute('type', 'success');
        if (lhs) {
            root.addChild(lhs);
        }
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            switch (token.value) {
                case 'c':
                    root.setAttribute('type', 'success');
                    break;
                case 'cs':
                    root.setAttribute('type', 'success');
                    break;
                case 'cf':
                    root.setAttribute('type', 'failure');
                    break;
                default: this.errorMessage(result, "Unknown critical type " + token.value + ". Must be (c|cs|cf).", token);
            }
        }
        this.lexer.getNextToken();
        var tokenType = this.lexer.peekNextToken().type;
        if (Object.keys(BooleanOperatorMap).indexOf(tokenType.toString()) > -1) {
            root.addChild(this.parseCompareModifier(result));
        }
        return root;
    };
    DiceParser.prototype.parseKeep = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.Keep);
        root.setAttribute('type', 'highest');
        if (lhs) {
            root.addChild(lhs);
        }
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            switch (token.value) {
                case 'k':
                    root.setAttribute('type', 'highest');
                    break;
                case 'kh':
                    root.setAttribute('type', 'highest');
                    break;
                case 'kl':
                    root.setAttribute('type', 'lowest');
                    break;
                case 'km':
                    root.setAttribute('type', 'middle');
                    break;
                default: this.errorMessage(result, "Unknown keep type " + token.value + ". Must be (k|kh|kl|km).", token);
            }
        }
        this.lexer.getNextToken(); // Consume.
        var tokenType = this.lexer.peekNextToken().type;
        if (tokenType === lexer_1.TokenType.Number || tokenType === lexer_1.TokenType.ParenthesisOpen) {
            root.addChild(this.parseSimpleFactor(result));
        }
        else {
            root.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 1));
        }
        return root;
    };
    DiceParser.prototype.parseDrop = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.Drop);
        root.setAttribute('type', 'lowest');
        if (lhs) {
            root.addChild(lhs);
        }
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            switch (token.value) {
                case 'd':
                    root.setAttribute('type', 'lowest');
                    break;
                case 'dh':
                    root.setAttribute('type', 'highest');
                    break;
                case 'dl':
                    root.setAttribute('type', 'lowest');
                    break;
                case 'dm':
                    root.setAttribute('type', 'middle');
                    break;
                default: this.errorMessage(result, "Unknown drop type " + token.value + ". Must be (d|dh|dl|dm).", token);
            }
        }
        this.lexer.getNextToken(); // Consume.
        var tokenType = this.lexer.peekNextToken().type;
        if (tokenType === lexer_1.TokenType.Number || tokenType === lexer_1.TokenType.ParenthesisOpen) {
            root.addChild(this.parseSimpleFactor(result));
        }
        return root;
    };
    DiceParser.prototype.parseReroll = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.Reroll);
        root.setAttribute('once', false);
        if (lhs) {
            root.addChild(lhs);
        }
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            switch (token.value) {
                case 'r':
                    root.setAttribute('once', false);
                    break;
                case 'ro':
                    root.setAttribute('once', true);
                    break;
                default: this.errorMessage(result, "Unknown reroll type " + token.value + ". Must be (r|ro).", token);
            }
        }
        this.lexer.getNextToken(); // Consume.
        var tokenType = this.lexer.peekNextToken().type;
        if (Object.keys(BooleanOperatorMap).indexOf(tokenType.toString()) > -1) {
            root.addChild(this.parseCompareModifier(result));
        }
        return root;
    };
    DiceParser.prototype.parseSort = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.Sort);
        root.setAttribute('direction', 'ascending');
        if (lhs) {
            root.addChild(lhs);
        }
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            switch (token.value) {
                case 's':
                    root.setAttribute('direction', 'ascending');
                    break;
                case 'sa':
                    root.setAttribute('direction', 'ascending');
                    break;
                case 'sd':
                    root.setAttribute('direction', 'descending');
                    break;
                default: this.errorMessage(result, "Unknown sort type " + token.value + ". Must be (s|sa|sd).", token);
            }
        }
        this.lexer.getNextToken(); // Consume.
        return root;
    };
    DiceParser.prototype.parseSubtractFailure = function (result, lhs) {
        var root = Ast.Factory.create(Ast.NodeType.SubtractFailure);
        if (lhs) {
            root.addChild(lhs);
        }
        var token = this.lexer.peekNextToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            switch (token.value) {
                case 'f':
                    root.setAttribute('subtractFailure', true);
                    break;
                default: this.errorMessage(result, "Unknown subtractFailure type " + token.value + ". Must be f.", token);
            }
        }
        this.lexer.getNextToken(); // Consume.
        var tokenType = this.lexer.peekNextToken().type;
        if (tokenType === lexer_1.TokenType.Number) {
            var equal = Ast.Factory.create(Ast.NodeType.Equal);
            equal.addChild(this.parseSimpleFactor(result));
            root.addChild(equal);
        }
        else if (Object.keys(BooleanOperatorMap).indexOf(tokenType.toString()) > -1) {
            root.addChild(this.parseCompareModifier(result));
        }
        return root;
    };
    DiceParser.prototype.parseCompareModifier = function (result, lhs) {
        var token = this.lexer.peekNextToken();
        var root;
        if (token.type === lexer_1.TokenType.Number) {
            root = Ast.Factory.create(Ast.NodeType.Equal);
        }
        else if (Object.keys(BooleanOperatorMap).indexOf(token.type.toString()) > -1) {
            root = Ast.Factory.create(BooleanOperatorMap[token.type]);
            this.lexer.getNextToken();
        }
        else {
            this.errorToken(result, lexer_1.TokenType.Number, token);
        }
        if (lhs) {
            root.addChild(lhs);
        }
        root.addChild(this.parseSimpleFactor(result));
        return root;
    };
    DiceParser.prototype.parseDiceModifiers = function (result, root) {
        while (true) {
            var token = this.lexer.peekNextToken();
            if (Object.keys(BooleanOperatorMap).indexOf(token.type.toString()) > -1) {
                root = this.parseCompareModifier(result, root);
            }
            else if (token.type === lexer_1.TokenType.Identifier) {
                switch (token.value[0]) {
                    case 'c':
                        root = this.parseCritical(result, root);
                        break;
                    case 'd':
                        root = this.parseDrop(result, root);
                        break;
                    case 'k':
                        root = this.parseKeep(result, root);
                        break;
                    case 'r':
                        root = this.parseReroll(result, root);
                        break;
                    case 's':
                        root = this.parseSort(result, root);
                        break;
                    case 'f':
                        root = this.parseSubtractFailure(result, root);
                        break;
                    default:
                        this.errorToken(result, lexer_1.TokenType.Identifier, token);
                        return root;
                }
            }
            else if (token.type === lexer_1.TokenType.Exclamation) {
                root = this.parseExplode(result, root);
            }
            else {
                break;
            }
        }
        return root;
    };
    DiceParser.prototype.parseGroupModifiers = function (result, root) {
        while (true) {
            var token = this.lexer.peekNextToken();
            if (Object.keys(BooleanOperatorMap).indexOf(token.type.toString()) > -1) {
                root = this.parseCompareModifier(result, root);
            }
            else if (token.type === lexer_1.TokenType.Identifier) {
                switch (token.value[0]) {
                    case 'd':
                        root = this.parseDrop(result, root);
                        break;
                    case 'k':
                        root = this.parseKeep(result, root);
                        break;
                    case 's':
                        root = this.parseSort(result, root);
                        break;
                    default:
                        this.errorToken(result, lexer_1.TokenType.Identifier, token);
                        return root;
                }
            }
            else {
                break;
            }
        }
        return root;
    };
    return DiceParser;
}(basic_parser_class_1.BasicParser));
exports.DiceParser = DiceParser;
//# sourceMappingURL=dice-parser.class.js.map