import { CmdStmt, LoopStmt, Operation, Statement } from "./ast";
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

        return this.cmdStatement();
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

    cmdStatement(): CmdStmt {
        switch(this.peek().type) {
            case TokenType.INCREMENT:
                this.consume(TokenType.INCREMENT, '')
                return new CmdStmt(Operation.INCR);
            case TokenType.DECREMENT:
                this.consume(TokenType.DECREMENT, '')
                return new CmdStmt(Operation.DECR);
            case TokenType.MOVE_FW:
                this.consume(TokenType.MOVE_FW, '')
                return new CmdStmt(Operation.MOVE_RIGHT);
            case TokenType.MOVE_BACK:
                this.consume(TokenType.MOVE_BACK, '')
                return new CmdStmt(Operation.MOVE_LEFT);
            case TokenType.INPUT:
                this.consume(TokenType.INPUT, '');
                return new CmdStmt(Operation.IN);
            case TokenType.OUTPUT:
                this.consume(TokenType.OUTPUT, '');
                return new CmdStmt(Operation.OUT);
            default:
                throw new SyntaxError('Unexpected token');
        }
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

    consume(type: TokenType, message: string) {
        if (this.check(type)) return this.advance();

        throw new SyntaxError(this.peek() + ' ' + message);
    }
}