export interface Visitor<T> {
    visitLoopStatement(stmt: LoopStmt): T
    visitMoveStatement(stmt: MoveStmt): T
    visitIncrStatement(stmt: IncrStmt): T
    visitOutputStatement(stmt: OutputStmt): T
    visitInputStatement(stmt: InputStmt): T
}

export abstract class Statement {
    abstract accept<T>(visitor: Visitor<T>): T;
}

export class Program {
    body: Statement[];

    constructor(body: Statement[]) {
        this.body = body;
    }
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

export class MoveStmt extends Statement {
    value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitMoveStatement(this);
    }
}

export class IncrStmt extends Statement {
    value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIncrStatement(this);
    }
}

export class OutputStmt extends Statement {
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitOutputStatement(this);
    }
}

export class InputStmt extends Statement {
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitInputStatement(this);
    }
}