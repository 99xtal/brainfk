interface Visitor<T> {
    visitLoopStatement(stmt: LoopStmt): T
    visitCmdStatement(stmt: CmdStmt): T
}

export abstract class Statement {
    abstract accept<T>(visitor: Visitor<T>): T;
}

export class LoopStmt extends Statement {
    body: Statement[];

    constructor(body: Statement[]) {
        super();
        this.body = body;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitLoopStatement(this);
    }
}

export enum Operator {
    MOVE_RIGHT = ">",
    MOVE_LEFT = "<",
    INCR = "+",
    DECR = "-",
    OUT = ".",
    IN = ","
}

export class CmdStmt extends Statement {
    operator: Operator;

    constructor(command: Operator) {
        super();
        this.operator = command;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitCmdStatement(this);
    }
}

export class AstPrinter implements Visitor<string> {
    print(stmt: Statement) {
        return stmt.accept(this);
    }

    visitCmdStatement(stmt: CmdStmt): string {
        return stmt.operator;
    }

    visitLoopStatement(stmt: LoopStmt): string {
        return "\n[\n\t" + stmt.body.map((s) => `${s.accept(this)}`) + "\n]\n"
    }
}