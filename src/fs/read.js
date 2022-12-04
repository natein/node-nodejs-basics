/*
read.js - implement function that prints content of the fileToRead.txt 
into console (if there's no file fileToRead.txt Error with message FS 
operation failed must be thrown)
*/

import { readFile } from 'node:fs/promises';
import { isExist } from './exist.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const fileToRead = '/files/fileToRead.txt';
const message = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const fileToReadPath = path.join(__dirname, fileToRead);
    const isFileExists = await isExist(fileToReadPath);

    if ( !isFileExists ) throw new Error(message);

    try {
        const contents = await readFile(fileToReadPath, { encoding: 'utf8' });
        console.log(contents);
    } catch (err) {
        console.error(err.message);
    } 
};

await read();