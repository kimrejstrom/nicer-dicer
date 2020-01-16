import { ExpressionNode } from './expression-node.class';
import { NodeType } from './node-type.enum';
export declare class Factory {
    static create(type: NodeType): ExpressionNode;
}
