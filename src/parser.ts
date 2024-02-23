import { IncrStmt, InputStmt, LoopStmt, MoveStmt, OutputStmt, Statement } from "./ast";
import { Token, TokenType } from "./tokenizer";

export class Parser {
    tokens: Token[];
    current: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse() {
        const statements: Statement[] = [];
        while (!this.isAtEnd()) {
            statements.push(this.statement());
        }

        return statements;
    }

    statement(): Statement {
        if (this.match(TokenType.OPEN_BRACE)) {
            return this.loopStatement();
        }

        if (this.match(TokenType.CLOSE_BRACE)) {
            throw new SyntaxError('Unmatched closing brace');
        }

        if (this.match(TokenType.INPUT)) {
            this.consume(TokenType.INPUT);
            return new InputStmt();
        }

        if (this.match(TokenType.OUTPUT)) {
            this.consume(TokenType.OUTPUT);
            return new OutputStmt();
        }

        if (this.match(TokenType.INCREMENT, TokenType.DECREMENT)) {
            return this.incrStatement();
        }

        if (this.match(TokenType.MOVE_BACK, TokenType.MOVE_FW)) {
            return this.moveStatement();
        }

        throw new Error('Unexpected token');
    }

    loopStatement(): LoopStmt {
        this.consume(TokenType.OPEN_BRACE, 'Expected [');
        const statements: Statement[] = [];

        while (!this.check(TokenType.CLOSE_BRACE) && !this.isAtEnd()) {
            statements.push(this.statement());
        }

        this.consume(TokenType.CLOSE_BRACE, 'Expected closing brace in loop');
        return new LoopStmt(statements);
    }

    incrStatement(): IncrStmt {
        let value = 0;
        while (this.match(TokenType.INCREMENT, TokenType.DECREMENT)) {
            if (this.advance().type == TokenType.INCREMENT) {
                value++;
            } else {
                value--;
            }
        }

        return new IncrStmt(value);
    }

    moveStatement(): MoveStmt {
        let value = 0;
        while (this.match(TokenType.MOVE_BACK, TokenType.MOVE_FW)) {
            if (this.advance().type == TokenType.MOVE_FW) {
                value++;
            } else {
                value--;
            }
        }

        return new MoveStmt(value);
    }

    match(...types: TokenType[]) {
        return types.some((t) => t === this.peek().type)
    }

    check(type: TokenType) {
        return this.peek().type === type;
    }

    advance() {
        if (!this.isAtEnd()) {
            this.current++;
        }
        return this.previousToken();
    }

    previousToken() {
        return this.tokens[this.current - 1];
    }

    peek() {
        return this.tokens[this.current];
    }

    isAtEnd() {
        return this.current >= this.tokens.length;
    }

    consume(type: TokenType, message?: string) {
        if (this.check(type)) return this.advance();

        throw new SyntaxError(this.peek() + ' ' + message);
    }
}