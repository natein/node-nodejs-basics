/*
create.js - implement function that creates new file fresh.txt with content 
I am fresh and young inside of the files folder (if file already exists Error 
with message FS operation failed must be thrown)
*/

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { isExist } from './exist.js';

const filePath = '/files/fresh.txt';
const content = 'I am fresh and young';
const message = 'FS operation failed';
const writingError = "Can't write to the file";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const fullPath = path.join(__dirname, filePath);
    const result = await isExist(fullPath);
    if ( result ) throw new Error(message);
    try {
      await await writeFile(fullPath, content);
    } catch (err) {
      console.error(writingError);
    }
};

await create();