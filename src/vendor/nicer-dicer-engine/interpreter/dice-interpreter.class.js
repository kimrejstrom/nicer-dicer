"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ast = require("../ast");
var generator_1 = require("../generator");
var random_1 = require("../random");
var default_function_definitions_1 = require("./default-function-definitions");
var dice_result_class_1 = require("./dice-result.class");
var error_message_class_1 = require("./error-message.class");
var DiceInterpreter = /** @class */ (function () {
    function DiceInterpreter(functions, random, generator, options) {
        if (options === void 0) { options = {}; }
        this.functions = default_function_definitions_1.DefaultFunctionDefinitions;
        Object.assign(this.functions, functions);
        this.random = random || new random_1.DefaultRandomProvider();
        this.generator = generator || new generator_1.DiceGenerator(options);
        this.memory = new Map();
        this.options = options;
    }
    DiceInterpreter.prototype.setMemory = function (key, value) {
        this.memory.set(key, value);
    };
    DiceInterpreter.prototype.getMemory = function (key) {
        return this.memory.get(key);
    };
    DiceInterpreter.prototype.interpret = function (expression) {
        var exp = expression.copy();
        var errors = [];
        var total = this.evaluate(exp, errors);
        var subtractFailures = !!expression.getAttribute('subtractFailure');
        var fails = this.countFailures(exp, subtractFailures, errors);
        var successes = this.countSuccesses(exp, subtractFailures, fails, errors);
        var renderedExpression = this.generator.generate(exp);
        return new dice_result_class_1.DiceResult(exp, renderedExpression, total, successes, fails, errors);
    };
    DiceInterpreter.prototype.evaluate = function (expression, errors) {
        if (!expression) {
            errors.push(new error_message_class_1.InterpreterError('Unexpected null node reference found.', expression));
            return 0;
        }
        if (expression.type === Ast.NodeType.DiceRoll) {
            return this.evaluateDiceRoll(expression, errors);
        }
        else if (expression.type === Ast.NodeType.Number) {
            return this.evaluateNumber(expression, errors);
        }
        else if (expression.type === Ast.NodeType.DiceSides) {
            return this.evaluateDiceSides(expression, errors);
        }
        else if (!expression.getAttribute('value')) {
            var value = 0;
            switch (expression.type) {
                case Ast.NodeType.Add:
                    value = this.evaluateAdd(expression, errors);
                    break;
                case Ast.NodeType.Subtract:
                    value = this.evaluateSubtract(expression, errors);
                    break;
                case Ast.NodeType.Multiply:
                    value = this.evaluateMultiply(expression, errors);
                    break;
                case Ast.NodeType.Divide:
                    value = this.evaluateDivide(expression, errors);
                    break;
                case Ast.NodeType.Modulo:
                    value = this.evaluateModulo(expression, errors);
                    break;
                case Ast.NodeType.Negate:
                    value = this.evaluateNegate(expression, errors);
                    break;
                case Ast.NodeType.Exponent:
                    value = this.evaluateExponent(expression, errors);
                    break;
                case Ast.NodeType.Dice:
                    value = this.evaluateDice(expression, errors);
                    break;
                case Ast.NodeType.Function:
                    value = this.evaluateFunction(expression, errors);
                    break;
                case Ast.NodeType.String:
                    value = this.evaluateString(expression, errors);
                    break;
                case Ast.NodeType.Group:
                    value = this.evaluateGroup(expression, errors);
                    break;
                case Ast.NodeType.Repeat:
                    value = this.evaluateRepeat(expression, errors);
                    break;
                case Ast.NodeType.Explode:
                    value = this.evaluateExplode(expression, errors);
                    break;
                case Ast.NodeType.Keep:
                    value = this.evaluateKeep(expression, errors);
                    break;
                case Ast.NodeType.Drop:
                    value = this.evaluateDrop(expression, errors);
                    break;
                case Ast.NodeType.Critical:
                    value = this.evaluateCritical(expression, errors);
                    break;
                case Ast.NodeType.Reroll:
                    value = this.evaluateReroll(expression, errors);
                    break;
                case Ast.NodeType.Sort:
                    value = this.evaluateSort(expression, errors);
                    break;
                case Ast.NodeType.SubtractFailure:
                    value = this.evaluateSubtractFailure(expression, errors);
                    break;
                case Ast.NodeType.Equal:
                    value = this.evaluateEqual(expression, errors);
                    break;
                case Ast.NodeType.Greater:
                    value = this.evaluateGreater(expression, errors);
                    break;
                case Ast.NodeType.GreaterOrEqual:
                    value = this.evaluateGreaterOrEqual(expression, errors);
                    break;
                case Ast.NodeType.Less:
                    value = this.evaluateLess(expression, errors);
                    break;
                case Ast.NodeType.LessOrEqual:
                    value = this.evaluateLessOrEqual(expression, errors);
                    break;
                default:
                    errors.push(new error_message_class_1.InterpreterError("Unrecognized node type '" + expression.type + "'.", expression));
                    return 0;
            }
            expression.setAttribute('value', value);
        }
        return expression.getAttribute('value');
    };
    DiceInterpreter.prototype.evaluateAdd = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        return this.evaluate(expression.getChild(0), errors) + this.evaluate(expression.getChild(1), errors);
    };
    DiceInterpreter.prototype.evaluateSubtract = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        return this.evaluate(expression.getChild(0), errors) - this.evaluate(expression.getChild(1), errors);
    };
    DiceInterpreter.prototype.evaluateMultiply = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        return this.evaluate(expression.getChild(0), errors) * this.evaluate(expression.getChild(1), errors);
    };
    DiceInterpreter.prototype.evaluateDivide = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        return this.evaluate(expression.getChild(0), errors) / this.evaluate(expression.getChild(1), errors);
    };
    DiceInterpreter.prototype.evaluateModulo = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        return this.evaluate(expression.getChild(0), errors) % this.evaluate(expression.getChild(1), errors);
    };
    DiceInterpreter.prototype.evaluateExponent = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        return Math.pow(this.evaluate(expression.getChild(0), errors), this.evaluate(expression.getChild(1), errors));
    };
    DiceInterpreter.prototype.evaluateNegate = function (expression, errors) {
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        return -this.evaluate(expression.getChild(0), errors);
    };
    DiceInterpreter.prototype.evaluateNumber = function (expression, errors) {
        return expression.getAttribute('value');
    };
    DiceInterpreter.prototype.evaluateDiceSides = function (expression, errors) {
        return expression.getAttribute('value');
    };
    DiceInterpreter.prototype.evaluateDiceRoll = function (expression, errors) {
        if (expression.getAttribute('drop') !== true) {
            return expression.getAttribute('value');
        }
        return 0;
    };
    DiceInterpreter.prototype.evaluateDice = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        var num = Math.round(this.evaluate(expression.getChild(0), errors));
        var _a = this.options, maxRollTimes = _a.maxRollTimes, maxDiceSides = _a.maxDiceSides;
        if (maxRollTimes && num > maxRollTimes) {
            errors.push(new error_message_class_1.InterpreterError("Invalid number of rolls: " + num + ". Maximum allowed: " + maxRollTimes + ".", expression));
            return null;
        }
        var sides = expression.getChild(1);
        var sidesValue = this.evaluate(sides, errors);
        if (maxDiceSides && sidesValue > maxDiceSides) {
            errors.push(new error_message_class_1.InterpreterError("Invalid number of dice sides: " + sidesValue + ". Maximum allowed: " + maxDiceSides + ".", expression));
            return null;
        }
        expression.setAttribute('sides', sidesValue);
        expression.clearChildren();
        var total = 0;
        for (var x = 0; x < num; x++) {
            var diceRoll = this.createDiceRoll(sides, errors);
            expression.addChild(diceRoll);
            total += this.evaluate(diceRoll, errors);
        }
        return total;
    };
    DiceInterpreter.prototype.evaluateFunction = function (expression, errors) {
        var fName = expression.getAttribute('name');
        if (Object.keys(this.functions).indexOf(fName) === -1) {
            errors.push(new error_message_class_1.InterpreterError("Unknown function: " + fName, expression));
            return 0;
        }
        var result = this.functions[fName](this, expression, errors);
        return result;
    };
    DiceInterpreter.prototype.evaluateString = function (expression, errors) {
        return expression.getAttribute('value');
    };
    DiceInterpreter.prototype.evaluateGroup = function (expression, errors) {
        var _this = this;
        var total = 0;
        expression.forEachChild(function (child) {
            total += _this.evaluate(child, errors);
        });
        return total;
    };
    DiceInterpreter.prototype.evaluateRepeat = function (expression, errors) {
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        var lhs = expression.getChild(0);
        var times = this.evaluate(expression.getChild(1), errors);
        var parent = expression.getParent();
        parent.removeChild(expression);
        var total = 0;
        for (var x = 0; x < times; x++) {
            var copy = lhs.copy();
            parent.addChild(copy);
            total += this.evaluate(copy, errors);
        }
        return total;
    };
    DiceInterpreter.prototype.evaluateExplode = function (expression, errors) {
        var _this = this;
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var penetrate = expression.getAttribute('penetrate');
        var sides = dice.getAttribute('sides');
        var condition;
        if (expression.getChildCount() > 1) {
            condition = expression.getChild(1);
            if (this.wouldRollAgainForever(dice, condition, errors)) {
                return 0;
            }
        }
        else {
            condition = Ast.Factory.create(Ast.NodeType.Equal);
            condition.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', sides));
        }
        this.evaluate(dice, errors);
        var _a = this.options.maxExplode, maxExplode = _a === void 0 ? 1000 : _a;
        var total = 0;
        dice.forEachChild(function (die, index) {
            if (!die.getAttribute('drop')) {
                var dieValue = _this.evaluate(die, errors);
                total += dieValue;
                var loopCount = 0;
                while (condition && _this.evaluateComparison(dieValue, condition, errors) && loopCount < maxExplode - 1) {
                    loopCount++;
                    die.setAttribute('explode', true);
                    die = _this.createDiceRoll(sides, errors);
                    dieValue = _this.evaluate(die, errors);
                    if (penetrate) {
                        dieValue -= 1;
                    }
                    total += dieValue;
                    dice.insertChild(die, index + loopCount);
                }
            }
        });
        return total;
    };
    DiceInterpreter.prototype.evaluateKeep = function (expression, errors) {
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var countTotal = (expression.getChildCount() > 1) ? this.evaluate(expression.getChild(1), errors) : 1;
        var type = expression.getAttribute('type');
        this.evaluate(dice, errors);
        var rolls = this.getSortedDiceRolls(dice, (type === 'lowest') ? 'ascending' : 'descending', errors).rolls;
        var total = 0;
        if (type === 'middle') {
            var middleIndex = Math.floor(rolls.length / 2);
            var lowEnd_1 = middleIndex - (countTotal - 1);
            var highEnd_1 = middleIndex + (countTotal - 1);
            rolls.forEach(function (roll, index) {
                if (index >= lowEnd_1 && index <= highEnd_1) {
                    roll.setAttribute('drop', false);
                    total += roll.getAttribute('value');
                }
                else {
                    roll.setAttribute('drop', true);
                }
            });
        }
        else {
            var count_1 = 0;
            rolls.forEach(function (roll) {
                if (count_1 < countTotal) {
                    roll.setAttribute('drop', false);
                    total += roll.getAttribute('value');
                }
                else {
                    roll.setAttribute('drop', true);
                }
                count_1++;
            });
        }
        return total;
    };
    DiceInterpreter.prototype.evaluateDrop = function (expression, errors) {
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var countTotal = (expression.getChildCount() > 1) ? this.evaluate(expression.getChild(1), errors) : 1;
        var type = expression.getAttribute('type');
        this.evaluate(dice, errors);
        var rolls = this.getSortedDiceRolls(dice, (type === 'lowest') ? 'ascending' : 'descending', errors).rolls;
        var total = 0;
        if (type === 'middle') {
            var middleIndex = Math.floor(rolls.length / 2);
            var lowEnd_2 = middleIndex - (countTotal - 1);
            var highEnd_2 = middleIndex + (countTotal - 1);
            rolls.forEach(function (roll, index) {
                if (index >= lowEnd_2 && index <= highEnd_2) {
                    roll.setAttribute('drop', true);
                }
                else {
                    roll.setAttribute('drop', false);
                    total += roll.getAttribute('value');
                }
            });
        }
        else {
            var count_2 = 0;
            rolls.forEach(function (roll) {
                if (count_2 < countTotal) {
                    roll.setAttribute('drop', true);
                }
                else {
                    roll.setAttribute('drop', false);
                    total += roll.getAttribute('value');
                }
                count_2++;
            });
        }
        return total;
    };
    DiceInterpreter.prototype.evaluateCritical = function (expression, errors) {
        var _this = this;
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var type = expression.getAttribute('type');
        var condition;
        if (expression.getChildCount() > 1) {
            condition = expression.getChild(1);
        }
        else {
            condition = Ast.Factory.create(Ast.NodeType.Equal);
            if (type === 'success') {
                this.expectChildCount(dice, 2, errors);
                condition.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', dice.getAttribute('sides')));
            }
            else {
                condition.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 1));
            }
        }
        this.evaluate(dice, errors);
        var total = 0;
        dice.forEachChild(function (die) {
            var dieValue = _this.evaluate(die, errors);
            if (_this.evaluateComparison(dieValue, condition, errors)) {
                die.setAttribute('critical', type);
                total += dieValue;
            }
        });
        return total;
    };
    DiceInterpreter.prototype.evaluateReroll = function (expression, errors) {
        var _this = this;
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var condition;
        var once = expression.getAttribute('once');
        if (expression.getChildCount() > 1) {
            condition = expression.getChild(1);
            if (this.wouldRollAgainForever(dice, condition, errors)) {
                return 0;
            }
        }
        else {
            condition = Ast.Factory.create(Ast.NodeType.Equal);
            condition.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 1));
        }
        this.evaluate(dice, errors);
        var total = 0;
        var sides = dice.getAttribute('sides');
        dice.forEachChild(function (die, index) {
            if (!die.getAttribute('drop')) {
                var dieValue = _this.evaluate(die, errors);
                var loopCount = 0;
                while (condition && _this.evaluateComparison(dieValue, condition, errors)) {
                    loopCount++;
                    die.setAttribute('reroll', true);
                    dieValue = _this.createDiceRollValue(sides, errors);
                    if (_this.options.renderExpressionDecorators) {
                        die = Ast.Factory.create(Ast.NodeType.DiceRoll)
                            .setAttribute('value', dieValue)
                            .setAttribute('drop', false);
                        dice.insertChild(die, index + loopCount);
                    }
                    else {
                        die.setAttribute('value', dieValue);
                    }
                    if (once) {
                        break;
                    }
                }
                total += dieValue;
            }
        });
        return total;
    };
    DiceInterpreter.prototype.evaluateSort = function (expression, errors) {
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var rolls = this.getSortedDiceRolls(dice, expression.getAttribute('direction'), errors);
        dice.clearChildren();
        rolls.rolls.forEach(function (roll) { return dice.addChild(roll); });
        return rolls.total;
    };
    DiceInterpreter.prototype.evaluateSubtractFailure = function (expression, errors) {
        var _this = this;
        if (!this.expectChildCount(expression, 1, errors)) {
            return 0;
        }
        var dice = this.findDiceOrGroupNode(expression, errors);
        if (!dice) {
            return 0;
        }
        var condition;
        if (expression.getChildCount() > 1) {
            condition = expression.getChild(1);
            if (condition.type === Ast.NodeType.Number) {
                var value = condition.getAttribute('value');
                condition = Ast.Factory.create(Ast.NodeType.Equal);
                condition.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', value));
            }
        }
        else {
            condition = Ast.Factory.create(Ast.NodeType.Equal);
            condition.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 1));
        }
        this.evaluate(dice, errors);
        var total = 0;
        dice.forEachChild(function (die) {
            if (!die.getAttribute('drop')) {
                var dieValue = _this.evaluate(die, errors);
                if (_this.evaluateComparison(dieValue, condition, errors)) {
                    die.setAttribute('failure', true);
                }
                else {
                    die.setAttribute('failure', false);
                }
                total += dieValue;
            }
        });
        return total;
    };
    DiceInterpreter.prototype.evaluateEqual = function (expression, errors) {
        return this.evaluateSuccess(expression, function (l, r) { return (l === r); }, errors);
    };
    DiceInterpreter.prototype.evaluateGreater = function (expression, errors) {
        return this.evaluateSuccess(expression, function (l, r) { return (l > r); }, errors);
    };
    DiceInterpreter.prototype.evaluateGreaterOrEqual = function (expression, errors) {
        return this.evaluateSuccess(expression, function (l, r) { return (l >= r); }, errors);
    };
    DiceInterpreter.prototype.evaluateLess = function (expression, errors) {
        return this.evaluateSuccess(expression, function (l, r) { return (l < r); }, errors);
    };
    DiceInterpreter.prototype.evaluateLessOrEqual = function (expression, errors) {
        return this.evaluateSuccess(expression, function (l, r) { return (l <= r); }, errors);
    };
    DiceInterpreter.prototype.countSuccesses = function (expression, subtractFailures, fails, errors) {
        var successes = this.countSuccessOrFailure(expression, function (die) { return die.getAttribute('success'); }, errors);
        return subtractFailures ? successes - fails : successes;
    };
    DiceInterpreter.prototype.countFailures = function (expression, subtractFailures, errors) {
        return this.countSuccessOrFailure(expression, function (die) { return subtractFailures ? die.getAttribute('failure') : !die.getAttribute('success'); }, errors);
    };
    DiceInterpreter.prototype.countSuccessOrFailure = function (expression, condition, errors) {
        var _this = this;
        var total = 0;
        if (expression.type === Ast.NodeType.Dice || expression.type === Ast.NodeType.Group) {
            expression.forEachChild(function (die) {
                if (!die.getAttribute('drop') && condition(die)) {
                    total++;
                }
            });
        }
        else {
            expression.forEachChild(function (die) {
                total += _this.countSuccessOrFailure(die, condition, errors);
            });
        }
        return total;
    };
    DiceInterpreter.prototype.expectChildCount = function (expression, count, errors) {
        var findCount = expression.getChildCount();
        if (findCount < count) {
            var err = new error_message_class_1.InterpreterError("Expected " + expression.type + " node to have " + count + " children, but found " + findCount + ".", expression);
            errors.push(err);
            return false;
        }
        return true;
    };
    DiceInterpreter.prototype.evaluateComparison = function (lhs, expression, errors) {
        if (!this.expectChildCount(expression, 1, errors)) {
            return false;
        }
        switch (expression.type) {
            case Ast.NodeType.Equal: return lhs === this.evaluate(expression.getChild(0), errors);
            case Ast.NodeType.Greater: return lhs > this.evaluate(expression.getChild(0), errors);
            case Ast.NodeType.GreaterOrEqual: return lhs >= this.evaluate(expression.getChild(0), errors);
            case Ast.NodeType.Less: return lhs < this.evaluate(expression.getChild(0), errors);
            case Ast.NodeType.LessOrEqual: return lhs <= this.evaluate(expression.getChild(0), errors);
            default:
                errors.push(new error_message_class_1.InterpreterError("Unrecognized comparison operator '" + expression.type + "'.", expression));
                return false;
        }
    };
    DiceInterpreter.prototype.evaluateSuccess = function (expression, compare, errors) {
        var _this = this;
        if (!this.expectChildCount(expression, 2, errors)) {
            return 0;
        }
        var rhv = this.evaluate(expression.getChild(1), errors);
        if (expression.getChild(0).type === Ast.NodeType.Number || expression.getChild(0).type === Ast.NodeType.Negate) {
            var res = compare(this.evaluate(expression.getChild(0), errors), rhv) ? 1 : 0;
            expression.setAttribute('success', res);
            return res ? 1 : 0;
        }
        var total = 0;
        var diceOrGroup = this.findDiceOrGroupNode(expression, errors);
        if (!diceOrGroup) {
            return 0;
        }
        diceOrGroup.forEachChild(function (die) {
            if (!die.getAttribute('drop')) {
                var val = _this.evaluate(die, errors);
                var res = compare(_this.evaluate(die, errors), rhv);
                die.setAttribute('success', res);
                if (res) {
                    total += val;
                }
            }
        });
        return total;
    };
    DiceInterpreter.prototype.findDiceOrGroupNode = function (expression, errors) {
        if (expression.type === Ast.NodeType.Dice || expression.type === Ast.NodeType.Group) {
            return expression;
        }
        if (expression.getChildCount() < 1) {
            errors.push(new error_message_class_1.InterpreterError('Missing dice/group node.', expression));
            return null;
        }
        var child = expression.getChild(0);
        this.evaluate(child, errors);
        return this.findDiceOrGroupNode(child, errors);
    };
    DiceInterpreter.prototype.getSortedDiceRolls = function (dice, direction, errors) {
        var _this = this;
        var output = { rolls: [], total: 0 };
        dice.forEachChild(function (die) {
            output.rolls.push(die);
            output.total += _this.evaluate(die, errors);
        });
        var sortOrder;
        if (direction === 'descending') {
            sortOrder = function (a, b) { return b.getAttribute('value') - a.getAttribute('value'); };
        }
        else if (direction === 'ascending') {
            sortOrder = function (a, b) { return a.getAttribute('value') - b.getAttribute('value'); };
        }
        else {
            errors.push(new error_message_class_1.InterpreterError("Unknown sort direction: " + direction + ". Expected 'ascending' or 'descending'.", dice));
        }
        output.rolls = output.rolls.sort(sortOrder);
        return output;
    };
    DiceInterpreter.prototype.createDiceRoll = function (sides, errors) {
        var sidesValue = sides instanceof Ast.ExpressionNode
            ? sides.getAttribute('value')
            : sides;
        var diceRoll = this.createDiceRollValue(sides, errors);
        return Ast.Factory.create(Ast.NodeType.DiceRoll)
            .setAttribute('value', diceRoll)
            .setAttribute('drop', false);
    };
    DiceInterpreter.prototype.createDiceRollValue = function (sides, errors) {
        var minValue = 1, maxValue = 0;
        var sidesValue = sides instanceof Ast.ExpressionNode
            ? sides.getAttribute('value')
            : sides;
        if (sidesValue === 'fate') {
            minValue = -1;
            maxValue = 1;
        }
        else {
            maxValue = Math.round(sides instanceof Ast.ExpressionNode ? this.evaluate(sides, errors) : sides);
        }
        return this.random.numberBetween(minValue, maxValue);
    };
    DiceInterpreter.prototype.wouldRollAgainForever = function (dice, expression, errors) {
        var sides = dice.getAttribute('sides');
        var value = expression.getChild(0).getAttribute('value');
        var wouldRunForever = false;
        switch (expression.type) {
            case Ast.NodeType.Equal:
                wouldRunForever = sides === 1 && value === 1;
                break;
            case Ast.NodeType.Greater:
                wouldRunForever = value < 1;
                break;
            case Ast.NodeType.GreaterOrEqual:
                wouldRunForever = value <= 1;
                break;
            case Ast.NodeType.Less:
                wouldRunForever = value > sides;
                break;
            case Ast.NodeType.LessOrEqual: wouldRunForever = value >= sides;
        }
        if (wouldRunForever) {
            errors.push(new error_message_class_1.InterpreterError('Condition to roll again includes all dice faces and would run forever.', expression));
        }
        return wouldRunForever;
    };
    return DiceInterpreter;
}());
exports.DiceInterpreter = DiceInterpreter;
//# sourceMappingURL=dice-interpreter.class.js.map