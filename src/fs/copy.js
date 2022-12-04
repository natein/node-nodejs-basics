/*
copy.js - implement function that copies folder files files with all its content 
into folder files_copy at the same level (if files folder doesn't exists or files_copy 
has already been created Error with message FS operation failed must be thrown)
*/

import { mkdir, copyFile, readdir } from 'node:fs/promises';
import { isExist } from './exist.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const filesSrc = '/files/';
const filesDest = '/files_copy/';
const message = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const srcPath = path.join(__dirname, filesSrc);
    const destPath = path.join(__dirname, filesDest);
    const srcExist = await isExist(srcPath);
    const destExist = await isExist(destPath);

    if ( !srcExist || destExist ) throw new Error(message);

    try {
        await mkdir(destPath);
        const files = await readdir(srcPath);
        files.forEach(f => {                
            const srcFilePath = path.join(__dirname, filesSrc, f);
            const destFilePath = path.join(__dirname, filesDest, f);   
            copyFile(srcFilePath, destFilePath);
        }); 
    } catch (err) {
        console.error(err.message);
    }
};

copy();