import { IncrStmt, InputStmt, LoopStmt, MoveStmt, OutputStmt, Program, Statement, Visitor } from "./ast";

type InterpreterOptions = {
    memorySize?: number,
}

export class Interpreter implements Visitor<void> {
    memory: number[];
    memorySize: number;
    dp: number = 0;

    constructor(options?: InterpreterOptions) {
        const memorySize = options?.memorySize ?? 30_000;
        this.memorySize = memorySize;
        this.memory = new Array(memorySize).fill(0);
    }

    run(program: Program) {
        for (const statement of program.body) {
            statement.accept(this);
        }
    }

    visitLoopStatement(stmt: LoopStmt): void {
        while (this.cell() !== 0) {
            for (const statement of stmt.body) {
                statement.accept(this);
            }
        }
    }

    visitMoveStatement(stmt: MoveStmt): void {
        this.dp += stmt.value;
    }

    visitIncrStatement(stmt: IncrStmt): void {
        this.memory[this.dp % this.memorySize] += stmt.value;
    }

    visitInputStatement(stmt: InputStmt): void {
        // ??
    }

    visitOutputStatement(stmt: OutputStmt): void {
        const cellValue = this.cell();
        process.stdout.write(String.fromCharCode(cellValue));
    }

    cell() {
        return this.memory[this.dp % this.memorySize];
    }
}