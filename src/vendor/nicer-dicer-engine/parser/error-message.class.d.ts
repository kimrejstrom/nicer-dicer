import { Token } from '../lexer';
export declare class ParserError {
    message: string;
    token: Token;
    stackTrace: string;
    constructor(message: string, token: Token, stackTrace: string);
}
