/*
decompress.js - implement function that decompresses archive.gz back 
to the fileToCompress.txt with same content as before compression 
using zlib and Streams API
*/

import { pipeline } from 'stream';
import zlib from 'zlib';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';

const zippedFile = '/files/archive.gz';
const unzippedFile = '/files/fileToCompress.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const zippedFilePath = path.join(__dirname, zippedFile);
    const unzippedFilePath = path.join(__dirname, unzippedFile);

    const gunzip = zlib.createUnzip();
    const inputStream = fs.createReadStream(zippedFilePath);
    const outputStream = fs.createWriteStream(unzippedFilePath);
    pipeline(
        inputStream,
        gunzip,
        outputStream,
        (err) => {
            if (err) {
                process.stderr.write(`${err.name}: ${err.message}`);
                process.exit(-1);
            }
        }
    );
};

await decompress();