import { Parser } from "./parser";
import { Tokenizer } from "./tokenizer";

export default class Brainfuck {
    constructor(source: string) {
        const tokenizer = new Tokenizer(source);
        const tokens = tokenizer.scanTokens();

        const parser = new Parser(tokens);
        const statements = parser.parse();
    }
}