import { ExpressionNode } from '../ast';
import { InterpreterError } from '../interpreter/error-message.class';
import { Result } from './result.class';
export declare class DiceResult extends Result {
    readonly successes: number;
    readonly failures: number;
    readonly errors: InterpreterError[];
    constructor(expression: ExpressionNode, renderedExpression: string, total: number, successes: number, failures: number, errors: InterpreterError[]);
}
