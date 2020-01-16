import { CharacterStream } from './character-stream.interface';
import { Lexer } from './lexer.interface';
import { Token } from './token.class';
export declare class DiceLexer implements Lexer {
    protected stream: CharacterStream;
    private currentToken;
    private nextToken;
    private numCharRegex;
    private idCharRegex;
    constructor(input: CharacterStream | string);
    private isCharacterStream;
    peekNextToken(): Token;
    getNextToken(): Token;
    protected parseIdentifier(): Token;
    protected parseString(): Token;
    protected parseNumber(): Token;
    protected parseEllipsis(): Token;
    private constructNextToken;
    private createToken;
}
