/*
calcHash.js - implement function that calculates SHA256 hash for 
file fileToCalculateHashFor.txt and logs it into console as hex

SHA256 for "Calculate hash for me!"
7b90ad9e325c1c22b15c36cbe19413e3c471e5a711b8b828c8ebfcfd71d1d6db
*/

import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import * as path from 'path';

const fileToRead = '/files/fileToCalculateHashFor.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => { 
    const fileToReadPath = path.join(__dirname, fileToRead);
    const text = await readFile(fileToReadPath, { encoding: 'utf8' });

    const hash = crypto.createHash('sha256');
    hash.setEncoding('hex');
    hash.write(text);
    hash.end();

    const result = hash.read();
    console.log(result);
};

await calculateHash();