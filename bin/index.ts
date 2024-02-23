#!/usr/bin/env node
import fs from 'fs';
import readline from 'readline';
import Brainfuck from '../lib';
import chalk from 'chalk'

const [_, ...argv] = process.argv;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

if (argv.length === 1) {
    runRepl();
} else if (argv.length === 2) {
    runFromFile(argv[1]);
} else {
    console.log(`Usage: bf filename`);
    process.exit(1);
}


async function runRepl() {
    const bf = new Brainfuck();

    const prompt = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve));

    while (true) {
        const input = await prompt(chalk.blue(">> "));
        if (['exit', 'quit'].includes(input.toLowerCase())) {
            process.exit(0);
        } else {
            bf.run(input);
            const { pos, memory } = bf.state();
            printCellState(memory, pos);
        }
    }

}

function runFromFile(path: string) {
    try {
        const buf = fs.readFileSync(path);
        const source = buf.toString();
        const bf = new Brainfuck();
        bf.run(source);
        process.exit(0);
    } catch (err) {
        console.error('Failed to read file', err);
    }
}

function printCellState(cells: number[], pos: number) {
    console.log(chalk.gray(cells.slice(0, 20).map(v => `[${v}]`).join(',')+'...'));
    console.log(chalk.gray([...new Array(20).keys()].map((i) => i === pos ? ' ^' : '   ').join(' ')));
}