#!/usr/bin/env node
import fs from 'fs';
import readline from 'readline';
import Brainfuck from '../lib';

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
        const input = await prompt(">> ");
        if (['exit', 'quit'].includes(input.toLowerCase())) {
            process.exit(0);
        } else {
            bf.run(input);
        }
    }

}

function runFromFile(path: string) {
    try {
        const buf = fs.readFileSync(path);
        const source = buf.toString();
        const bf = new Brainfuck();
        bf.run(source);
    } catch (err) {
        console.error('Failed to read file', err);
    }
}