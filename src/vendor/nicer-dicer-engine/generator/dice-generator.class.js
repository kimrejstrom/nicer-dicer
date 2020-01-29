"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ast = require("../ast");
var DiceGenerator = /** @class */ (function () {
    function DiceGenerator(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    DiceGenerator.prototype.generate = function (expression) {
        switch (expression.type) {
            case Ast.NodeType.Number: return this.generateNumber(expression);
            case Ast.NodeType.Add: return this.generateAdd(expression);
            case Ast.NodeType.Subtract: return this.generateSubtract(expression);
            case Ast.NodeType.Multiply: return this.generateMultiply(expression);
            case Ast.NodeType.Divide: return this.generateDivide(expression);
            case Ast.NodeType.Modulo: return this.generateModulo(expression);
            case Ast.NodeType.Exponent: return this.generateExponent(expression);
            case Ast.NodeType.Negate: return this.generateNegate(expression);
            case Ast.NodeType.Dice: return this.generateDice(expression);
            case Ast.NodeType.DiceSides: return this.generateDiceSides(expression);
            case Ast.NodeType.DiceRoll: return this.generateDiceRoll(expression);
            case Ast.NodeType.Function: return this.generateFunction(expression);
            case Ast.NodeType.String: return this.generateString(expression);
            case Ast.NodeType.Group: return this.generateGroup(expression);
            case Ast.NodeType.Repeat: return this.generateRepeat(expression);
            case Ast.NodeType.Equal: return this.generateEqual(expression);
            case Ast.NodeType.Greater: return this.generateGreater(expression);
            case Ast.NodeType.GreaterOrEqual: return this.generateGreaterOrEqual(expression);
            case Ast.NodeType.Less: return this.generateLess(expression);
            case Ast.NodeType.LessOrEqual: return this.generateLessOrEqual(expression);
            case Ast.NodeType.Explode: return this.generateExplode(expression);
            case Ast.NodeType.Keep: return this.generateKeep(expression);
            case Ast.NodeType.Drop: return this.generateDrop(expression);
            case Ast.NodeType.Critical: return this.generateCritical(expression);
            case Ast.NodeType.Reroll: return this.generateReroll(expression);
            case Ast.NodeType.Sort: return this.generateSort(expression);
            case Ast.NodeType.SubtractFailure: return this.generateSubtractFailure(expression);
            default: throw new Error('Unrecognized node type.');
        }
    };
    DiceGenerator.prototype.generateNumber = function (expression) {
        return expression.getAttribute('value').toString();
    };
    DiceGenerator.prototype.generateAdd = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + ' + ' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateSubtract = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + ' - ' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateMultiply = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + ' * ' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateDivide = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + ' / ' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateModulo = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + ' % ' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateExponent = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + ' ^ ' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateNegate = function (expression) {
        this.expectChildCount(expression, 1);
        return '-' + this.generate(expression.getChild(0));
    };
    DiceGenerator.prototype.generateDice = function (expression) {
        if (expression.getChildCount() === 0 || expression.getChild(0).type === Ast.NodeType.DiceRoll) {
            return '[' + this.generateCommaList(expression) + ']';
        }
        else {
            this.expectChildCount(expression, 2);
            return this.generateWithParens(expression.getChild(0)) + 'd' + this.generateWithParens(expression.getChild(1));
        }
    };
    DiceGenerator.prototype.generateDiceSides = function (expression) {
        var val = expression.getAttribute('value').toString();
        return val === 'fate' ? 'F' : val;
    };
    DiceGenerator.prototype.generateDiceRoll = function (expression) {
        var exp = expression.getAttribute('value').toString();
        if (this.options.renderExpressionDecorators) {
            if (expression.getAttribute('reroll')) {
                exp = this.applyDecorator(exp, 'reroll', '↻');
            }
            if (expression.getAttribute('explode')) {
                exp = this.applyDecorator(exp, 'explode', '!');
            }
            if (expression.getAttribute('drop')) {
                exp = this.applyDecorator(exp, 'drop', '↓');
            }
            if (expression.getAttribute('critical')) {
                exp = this.applyDecorator(exp, 'critical', '*');
            }
            if (expression.getAttribute('success')) {
                exp = this.applyDecorator(exp, 'success', '✓');
            }
            if (expression.getAttribute('failure')) {
                exp = this.applyDecorator(exp, 'failure', '✗');
            }
        }
        return exp;
    };
    DiceGenerator.prototype.generateFunction = function (expression) {
        return expression.getAttribute('name') + '(' + this.generateCommaList(expression) + ')';
    };
    DiceGenerator.prototype.generateString = function (expression) {
        return '"' + expression.getAttribute('value') + '"';
    };
    DiceGenerator.prototype.generateGroup = function (expression) {
        return '{' + this.generateGroupCommaList(expression) + '}';
    };
    DiceGenerator.prototype.generateRepeat = function (expression) {
        this.expectChildCount(expression, 2);
        return this.generate(expression.getChild(0)) + '...' + this.generate(expression.getChild(1));
    };
    DiceGenerator.prototype.generateEqual = function (expression) {
        return this.generateEqualityExpression(expression, '=');
    };
    DiceGenerator.prototype.generateGreater = function (expression) {
        return this.generateEqualityExpression(expression, '>');
    };
    DiceGenerator.prototype.generateGreaterOrEqual = function (expression) {
        return this.generateEqualityExpression(expression, '>=');
    };
    DiceGenerator.prototype.generateLess = function (expression) {
        return this.generateEqualityExpression(expression, '<');
    };
    DiceGenerator.prototype.generateLessOrEqual = function (expression) {
        return this.generateEqualityExpression(expression, '<=');
    };
    DiceGenerator.prototype.generateExplode = function (expression) {
        this.expectChildCount(expression, 1);
        var exp = '!';
        if (expression.getAttribute('compound')) {
            exp += '!';
        }
        if (expression.getAttribute('penetrate')) {
            exp += 'p';
        }
        if (expression.getChildCount() > 1) {
            exp += this.generate(expression.getChild(1));
        }
        return this.generate(expression.getChild(0)) + exp;
    };
    DiceGenerator.prototype.generateKeep = function (expression) {
        this.expectChildCount(expression, 1);
        var exp = 'k';
        if (expression.getAttribute('type') === 'highest') {
            exp += 'h';
        }
        if (expression.getAttribute('type') === 'lowest') {
            exp += 'l';
        }
        if (expression.getAttribute('type') === 'middle') {
            exp += 'm';
        }
        if (expression.getChildCount() > 1) {
            exp += this.generate(expression.getChild(1));
        }
        return this.generate(expression.getChild(0)) + exp;
    };
    DiceGenerator.prototype.generateDrop = function (expression) {
        this.expectChildCount(expression, 1);
        var exp = 'd';
        if (expression.getAttribute('type') === 'highest') {
            exp += 'h';
        }
        if (expression.getAttribute('type') === 'lowest') {
            exp += 'l';
        }
        if (expression.getAttribute('type') === 'middle') {
            exp += 'm';
        }
        if (expression.getChildCount() > 1) {
            exp += this.generate(expression.getChild(1));
        }
        return this.generate(expression.getChild(0)) + exp;
    };
    DiceGenerator.prototype.generateCritical = function (expression) {
        this.expectChildCount(expression, 1);
        var critical = 'c';
        if (expression.getAttribute('type') === 'success') {
            critical += 's';
        }
        if (expression.getAttribute('type') === 'failure') {
            critical += 'f';
        }
        if (expression.getChildCount() > 1) {
            critical += this.generate(expression.getChild(1));
        }
        return this.generate(expression.getChild(0)) + critical;
    };
    DiceGenerator.prototype.generateReroll = function (expression) {
        this.expectChildCount(expression, 1);
        var reroll = 'r';
        if (expression.getAttribute('once')) {
            reroll += 'o';
        }
        if (expression.getChildCount() > 1) {
            reroll += this.generate(expression.getChild(1));
        }
        return this.generate(expression.getChild(0)) + reroll;
    };
    DiceGenerator.prototype.generateSort = function (expression) {
        this.expectChildCount(expression, 1);
        var sort = 's';
        if (expression.getAttribute('direction') === 'ascending') {
            sort += 'a';
        }
        if (expression.getAttribute('direction') === 'descending') {
            sort += 'd';
        }
        return this.generate(expression.getChild(0)) + sort;
    };
    DiceGenerator.prototype.generateSubtractFailure = function (expression) {
        this.expectChildCount(expression, 1);
        var subtractFailure = 'f';
        if (expression.getChildCount() > 1) {
            subtractFailure += this.generate(expression.getChild(1));
        }
        return this.generate(expression.getChild(0)) + subtractFailure;
    };
    DiceGenerator.prototype.generateEqualityExpression = function (expression, operator) {
        this.expectChildCount(expression, 1);
        if (expression.getChildCount() === 1) {
            return operator + this.generate(expression.getChild(0));
        }
        else {
            return (this.generate(expression.getChild(0)) +
                ' ' +
                operator +
                ' ' +
                this.generate(expression.getChild(1)) +
                ' | Difficulty: ' +
                operator +
                ' ' +
                this.generate(expression.getChild(1)));
        }
    };
    DiceGenerator.prototype.generateCommaList = function (expression) {
        var buffer = '';
        for (var x = 0; x < expression.getChildCount(); x++) {
            if (x > 0) {
                buffer += ', ';
            }
            buffer += this.generate(expression.getChild(x));
        }
        return buffer;
    };
    DiceGenerator.prototype.generateGroupCommaList = function (expression) {
        var buffer = '';
        for (var x = 0; x < expression.getChildCount(); x++) {
            if (x > 0) {
                buffer += '; ';
            }
            buffer += this.generate(expression.getChild(x));
            var groupTotal = expression.getChild(x).getAttribute('value');
            if (groupTotal && expression.getChild(x).type !== Ast.NodeType.Number) {
                buffer += " = " + groupTotal;
            }
        }
        return buffer;
    };
    DiceGenerator.prototype.generateWithParens = function (expression) {
        if (expression.getChildCount() === 0) {
            return this.generate(expression);
        }
        else {
            return '(' + this.generate(expression) + ')';
        }
    };
    DiceGenerator.prototype.expectChildCount = function (expression, count) {
        var findCount = expression.getChildCount();
        if (findCount < count) {
            throw new Error("Expected " + expression.type + " node to have " + count + " children, but found " + findCount + ".");
        }
    };
    DiceGenerator.prototype.applyDecorator = function (exp, type, defaultDecorator) {
        var decorator = (this.options.decorators && this.options.decorators[type]) || defaultDecorator;
        var decoratorLeft = '';
        var decoratorRight = decorator;
        if (decorator instanceof Array) {
            decoratorLeft = decorator.length >= 1 ? decorator[0] : '';
            decoratorRight = decorator.length >= 2 ? decorator[1] : '';
        }
        return "" + decoratorLeft + exp + decoratorRight;
    };
    return DiceGenerator;
}());
exports.DiceGenerator = DiceGenerator;
//# sourceMappingURL=dice-generator.class.js.map