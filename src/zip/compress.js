/*
compress.js - implement function that compresses file fileToCompress.txt 
to archive.gz using zlib and Streams API
*/

import { pipeline } from 'stream';
import zlib from 'zlib';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';

const srcFile = '/files/fileToCompress.txt';
const zippedFile = '/files/archive.gz';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const srcFilePath = path.join(__dirname, srcFile);
    const zippedFilePath = path.join(__dirname, zippedFile);
    const gzip = zlib.createGzip();
    const inputStream = fs.createReadStream(srcFilePath);
    const outputStream = fs.createWriteStream(zippedFilePath);
    pipeline(
        inputStream,
        gzip,
        outputStream,
        (err) => {
            if (err) {
                process.stderr.write(`${err.name}: ${err.message}`);
                process.exit(-1);
            }
        }
    );
};

await compress();