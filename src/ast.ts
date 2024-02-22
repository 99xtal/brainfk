export interface Visitor<T> {
    visitLoopStatement(stmt: LoopStmt): T
    visitCmdStatement(stmt: CmdStmt): T
}

export enum Operation {
    MOVE_RIGHT,
    MOVE_LEFT,
    INCR,
    DECR,
    OUT,
    IN
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

export class CmdStmt extends Statement {
    operation: Operation;

    constructor(operation: Operation) {
        super();
        this.operation = operation;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitCmdStatement(this);
    }
}