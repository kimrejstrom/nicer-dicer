import { ExpressionNode } from '../ast';
import { DiceInterpreter } from './dice-interpreter.class';
import { InterpreterError } from './error-message.class';
export declare type FunctionDefinition = (interpreter: DiceInterpreter, functionNode: ExpressionNode, errors: InterpreterError[]) => number;
