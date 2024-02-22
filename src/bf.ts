#!/usr/bin/env node
import fs from 'fs';
import Brainfuck from '.';

const [nodePath, ...argv] = process.argv;

if (argv.length !== 2) {
    console.log(`Usage: bf filename`);
    process.exit(1);
}

const filePath = argv[1];

try {
    const buf = fs.readFileSync(filePath);
    const source = buf.toString();
    const bf = new Brainfuck();
    bf.run(source);
} catch (err) {
    console.error('Failed to read file', err);
}