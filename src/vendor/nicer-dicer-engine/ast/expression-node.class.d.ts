import { NodeType } from './node-type.enum';
export declare class ExpressionNode {
    readonly type: NodeType;
    private attributes;
    private parent;
    private children;
    constructor(type: NodeType, parent?: ExpressionNode);
    copy(): ExpressionNode;
    addChild(node: ExpressionNode): ExpressionNode;
    insertChild(node: ExpressionNode, index?: number): ExpressionNode;
    clearChildren(): void;
    removeChild(expression: ExpressionNode): ExpressionNode;
    getParent(): ExpressionNode;
    getChild(index: number): ExpressionNode;
    getChildCount(): number;
    forEachChild(fn: (child: ExpressionNode, index?: number) => boolean | void): void;
    getAttribute(key: string): any;
    setAttribute(key: string, value: any): this;
    toJSON(): any;
}
