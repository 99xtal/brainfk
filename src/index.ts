enum TokenType {
    MOVE,
    INCREMENT,
    OUTPUT,
    INPUT,
    OPEN_BRACE,
    CLOSE_BRACE,
}

class Token {
    type: TokenType;
    text: string;
    literal?: string | number;
    line: number;

    constructor(type: TokenType, text: string, line: number, literal?: string | number) {
        this.type = type;
        this.line = line;
        this.text = text;
        this.literal = literal;
    }
}

class Scanner {
    source: string;
    tokens: Token[] = [];
    start: number = 0;
    current: number = 0;
    line: number = 1;

    constructor(source: string) {
        this.source = source
    }

    scanTokens() {
        while(!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        return this.tokens;
    }

    scanToken() {
        const char = this.advance();
        switch(char) {
            case '>':
            case '<':
                this.moveLiteral();
                break;
            case '+': 
            case '-':
                this.incrementLiteral();
                break;
            case '.': 
                this.addToken(TokenType.OUTPUT);
                break;
            case ',': 
                this.addToken(TokenType.INPUT);
                break;
            case '[': 
                this.addToken(TokenType.OPEN_BRACE); 
                break;
            case ']': 
                this.addToken(TokenType.CLOSE_BRACE);
                break;
            default: break;
        }
        if (char === '\n') {
            this.line++;
        }
    }

    addToken(type: TokenType, literal?: string | number) {
        const text = this.source.slice(this.start, this.current);
        const token = new Token(type, text, this.line, literal);
        this.tokens.push(token);
    }

    moveLiteral() {
        while ("<>\n".includes(this.peek()) && !this.isAtEnd()) {
            if (this.peek() === '\n') {
                this.line++;
            }
            this.advance();
        }

        const text = this.source.slice(this.start, this.current);
        let value = 0;
        for (const char of text) {
            if (char === '>') {
                value++;
            } else {
                value--;
            }
        }

        this.addToken(TokenType.MOVE, value);
    }

    incrementLiteral() {
        while ("+-\n".includes(this.peek()) && !this.isAtEnd()) {
            if (this.peek() === '\n') this.line++;
            this.advance();
        }

        const text = this.source.slice(this.start, this.current);
        let value = 0;
        for (const char of text) {
            if (char === '+') {
                value++;
            } else {
                value--;
            }
        }

        this.addToken(TokenType.INCREMENT, value);
    }

    isAtEnd() {
        return this.current >= this.source.length;
    }

    advance() {
        return this.source.charAt(this.current++);
    }

    peek() {
        if (this.isAtEnd()) return '\0';
        return this.source.charAt(this.current);
    }
}

export default class Brainfuck {
    constructor(source: string) {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();
        console.log(tokens);
    }
}