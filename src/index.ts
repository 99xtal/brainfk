const COMMANDS = '><+-.,[]';

type CommandSymbols = '>' | '<' | '+' | '-' | '.' | ',' | '[' | ']';

enum TokenType {
    MOVE_RIGHT,
    MOVE_LEFT,
    INCR,
    DECR,
    OUTPUT,
    INPUT,
    OPEN_BRACE,
    CLOSE_BRACE,
}

function isCommand(char: string): char is CommandSymbols {
    if (char.length !== 1) {
        return false;
    }

    return !!COMMANDS.includes(char);
}

class Token {
    type: TokenType;
    line: number;

    constructor(type: TokenType, line: number) {
        this.type = type;
        this.line = line;
    }
}

class Scanner {
    source: string;
    tokens: Token[] = [];
    line: number = 1;

    constructor(source: string) {
        this.source = source
    }

    scanTokens() {
        for (let i = 0; i < this.source.length; i++) {
            const char = this.source[i];
            if (isCommand(char)) {
                let token: Token;
                switch(char) {
                    case '>': token = new Token(TokenType.MOVE_RIGHT, this.line); break;
                    case '<': token = new Token(TokenType.MOVE_LEFT, this.line); break;
                    case '+': token = new Token(TokenType.INCR, this.line); break;
                    case '-': token = new Token(TokenType.DECR, this.line); break;
                    case '.': token = new Token(TokenType.OUTPUT, this.line); break;
                    case ',': token = new Token(TokenType.INPUT, this.line); break;
                    case '[': token = new Token(TokenType.OPEN_BRACE, this.line); break;
                    default: token = new Token(TokenType.CLOSE_BRACE, this.line); break;
                }
                this.tokens.push(token);
            } else if (char === '\n') {
                this.line++;
            }
        }

        return this.tokens;
    }
}

export default class Brainfuck {
    instructions = [];

    constructor(source: string) {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();
    }
}