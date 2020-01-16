import { DiceGenerator } from './generator';
import { DiceResult } from './interpreter';
import { DiceInterpreter } from './interpreter/dice-interpreter.class';
import { FunctionDefinitionList } from './interpreter/function-definition-list.class';
import { CharacterStream, Lexer } from './lexer';
import { Parser } from './parser';
import { RandomProvider } from './random';
import { Options } from './options.interface';
export declare class Dice {
    protected functions?: FunctionDefinitionList;
    protected randomProvider?: RandomProvider;
    protected options?: Options;
    constructor(functions?: FunctionDefinitionList, randomProvider?: RandomProvider, options?: Options);
    roll(input: string | CharacterStream): DiceResult;
    protected createLexer(input: string | CharacterStream): Lexer;
    protected createParser(lexer: Lexer): Parser;
    protected createInterpreter(): DiceInterpreter;
    protected createGenerator(): DiceGenerator;
}
