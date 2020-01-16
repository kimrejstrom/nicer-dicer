import { TokenType } from './token-type.enum';
export declare class Token {
    type: TokenType;
    position: number;
    value?: string;
    constructor(type: TokenType, position: number, value?: string);
}
