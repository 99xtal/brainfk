import { Interpreter } from "./interpreter";
import { Parser } from "./parser";
import { Tokenizer } from "./tokenizer";

export default class Brainfuck {
    interpreter = new Interpreter();

    run(source: string) {
        const statements = this.parse(source);

        return this.interpreter.run(statements);
    }

    parse(source: string) {
        const tokenizer = new Tokenizer(source);
        const tokens = tokenizer.scanTokens();

        const parser = new Parser(tokens);
        return parser.parse();
    }
}