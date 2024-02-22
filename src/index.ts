import { Interpreter } from "./interpreter";
import { Parser } from "./parser";
import { Tokenizer } from "./tokenizer";

export default class Brainfuck {
    interpreter = new Interpreter();

    run(source: string) {
        const tokenizer = new Tokenizer(source);
        const tokens = tokenizer.scanTokens();

        const parser = new Parser(tokens);
        const statements = parser.parse();

        return this.interpreter.run(statements);
    }
}