/*
rename.js - implement function that renames file wrongFilename.txt to properFilename 
with extension .md (if there's no file wrongFilename.txt or properFilename.md already 
exists Error with message FS operation failed must be thrown)
*/

import * as fsPromises from 'node:fs/promises';
import { isExist } from './exist.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const srcDir = '/files/';
const wrong = 'wrongFilename.txt';
const proper = 'properFilename.md';
const message = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const wrongFnPath = path.join(__dirname, srcDir, wrong);
    const properFnPath = path.join(__dirname, srcDir, proper);
    const isWrongExists = await isExist(wrongFnPath);
    const isProperExists = await isExist(properFnPath);

    if ( !isWrongExists && !isProperExists ) throw new Error(message);

    try {
        await fsPromises.rename(wrongFnPath, properFnPath);
    } catch (err) {
        console.error(err.message);
    }    
};

await rename();