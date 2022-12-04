/* 
write.js - implement function that writes process.stdin data 
into file fileToWrite.txt content using Writable Stream
*/

import { pipeline, Writable } from 'stream';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    fs.open(this.filename, 'a', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

const fileToWrite = '/files/fileToWrite.txt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const fileToWritePath = path.join(__dirname, fileToWrite)
  const pipelineInput = process.stdin;
  const pipelineOutput = new WriteStream(fileToWritePath);
  
  pipeline(
    pipelineInput,
    pipelineOutput,
    (err) => {
      if (err) {
        process.stderr.write(`${err.name}: ${err.message}`);
        process.exit(-1);
      }
    }
  );
};

await write();