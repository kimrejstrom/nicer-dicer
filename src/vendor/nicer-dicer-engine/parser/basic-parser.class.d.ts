import { Lexer, Token, TokenType } from '../lexer';
import { ParseResult } from './parse-result.class';
import { Parser } from './parser.interface';
export declare abstract class BasicParser implements Parser {
    protected readonly lexer: Lexer;
    constructor(input: Lexer | string);
    private isLexer;
    abstract parse(): ParseResult;
    protected expectAndConsume(result: ParseResult, expected: TokenType, actual?: Token): Token;
    protected expect(result: ParseResult, expected: TokenType, actual?: Token): Token;
    protected errorToken(result: ParseResult, expected: TokenType, actual: Token): void;
    protected errorMessage(result: ParseResult, message: string, token: Token): void;
}
