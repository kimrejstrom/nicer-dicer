import { RandomProvider } from './random-provider.class';
export declare class DefaultRandomProvider implements RandomProvider {
    private engine;
    constructor();
    numberBetween(min: number, max: number): number;
}
