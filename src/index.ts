import { Parser } from "./parser";
import { Scanner } from "./tokenizer";

export default class Brainfuck {
    constructor(source: string) {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();

        const parser = new Parser(tokens);
        const tree = parser.parse();
        console.log();
    }
}