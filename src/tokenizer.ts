export enum TokenType {
    MOVE_FW,
    MOVE_BACK,
    INCREMENT,
    DECREMENT,
    OUTPUT,
    INPUT,
    OPEN_BRACE,
    CLOSE_BRACE,
}

export class Token {
    type: TokenType;
    text: string;
    line: number;

    constructor(type: TokenType, text: string, line: number) {
        this.type = type;
        this.line = line;
        this.text = text;
    }
}

export class Scanner {
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
                this.addToken(TokenType.MOVE_FW);
                break;
            case '<':
                this.addToken(TokenType.MOVE_BACK);
                break;
            case '+':
                this.addToken(TokenType.INCREMENT);
                break;
            case '-':
                this.addToken(TokenType.DECREMENT);
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

    addToken(type: TokenType) {
        const text = this.source.slice(this.start, this.current);
        const token = new Token(type, text, this.line);
        this.tokens.push(token);
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