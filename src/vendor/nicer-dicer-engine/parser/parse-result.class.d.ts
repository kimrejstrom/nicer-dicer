import * as Ast from '../ast';
import { ParserError } from './error-message.class';
export declare class ParseResult {
    root: Ast.ExpressionNode;
    errors: ParserError[];
}
