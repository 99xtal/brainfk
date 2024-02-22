import { CmdStmt, LoopStmt, Operation, Statement, Visitor } from "./ast";

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

    run(statements: Statement[]) {
        for (const statement of statements) {
            statement.accept(this);
        }
    }

    cell() {
        return this.memory[this.dp % this.memorySize];
    }

    visitCmdStatement(stmt: CmdStmt): void {
        switch(stmt.operation) {
            case Operation.OUT:
                const cellValue = this.cell();
                process.stdout.write(String.fromCharCode(cellValue));
                break;
            case Operation.IN:
                // ??
                break;
            case Operation.INCR:
                this.memory[this.dp % this.memorySize]++;
                break;
            case Operation.DECR:
                this.memory[this.dp % this.memorySize]--;
                break;
            case Operation.MOVE_RIGHT:
                this.dp++;
                break;
            case Operation.MOVE_LEFT:
                this.dp--;
                break;
            default:
                throw new Error('Runtime Error :( fuck you')
        }
    }

    visitLoopStatement(stmt: LoopStmt): void {
        while (this.cell() !== 0) {
            for (const statement of stmt.body) {
                statement.accept(this);
            }
        }
    }
}