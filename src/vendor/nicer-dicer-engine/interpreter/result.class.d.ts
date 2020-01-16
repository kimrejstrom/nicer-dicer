import { ExpressionNode } from '../ast';
export declare class Result {
    readonly reducedExpression: ExpressionNode;
    readonly renderedExpression: string;
    readonly total: number;
    constructor(reducedExpression: ExpressionNode, renderedExpression: string, total: number);
}
