import { CharacterStream } from './character-stream.interface';
export declare class StringCharacterStream implements CharacterStream {
    private readonly input;
    private index;
    constructor(input: string);
    getCurrentPosition(): number;
    getNextCharacter(): string;
    getCurrentCharacter(): string;
    peekNextCharacter(): string;
    peekXCharactersForward(i: number): string;
}
