import { ExpressionNode } from '../ast';
export declare class InterpreterError {
    message: string;
    expression: ExpressionNode;
    stack: string;
    constructor(message: string, expression: ExpressionNode, stack?: string);
}
