/*
list.js - implement function that prints all array of filenames 
from files folder into console (if files folder doesn't exists Error with 
message FS operation failed must be thrown)
*/

import { readdir } from 'node:fs/promises';
import { isExist } from './exist.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const filesSrc = '/files/';
const message = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const srcPath = path.join(__dirname, filesSrc);
    const srcExist = await isExist(srcPath);

    if ( !srcExist ) throw new Error(message);

    try {
        const files = await readdir(srcPath);
        files.forEach( file => console.log(file) );
    } catch (err) {
        console.error(err.message);
    }
};

await list();