/*
delete.js - implement function that deletes file fileToRemove.txt 
(if there's no file fileToRemove.txt Error with message FS operation 
failed must be thrown)
*/

import { rm } from 'node:fs/promises';
import { isExist } from './exist.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const srcDir = '/files/';
const deleteFileName = 'fileToRemove.txt';
const message = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const deleteFilePath = path.join(__dirname, srcDir, deleteFileName);
    const isFileExists = await isExist(deleteFilePath);

    if (!isFileExists) throw new Error(message);

    try {
        await rm(deleteFilePath);
    } catch (err) {
        console.error(err.message);
    }   
};

await remove();