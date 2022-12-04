/*
read.js - implement function that reads file fileToRead.txt content 
using Readable Stream and prints it's content into process.stdout
*/

import fs from 'fs';
import { pipeline, Readable }  from 'stream';
import { fileURLToPath } from 'url';
import * as path from 'path';

class ReadStream extends Readable {
    constructor(filename) {
      super();
      this.filename = filename;
      this.fd = null;
    }
    _construct(callback) {
      fs.open(this.filename, (err, fd) => {
        if (err) {
          callback(err);
        } else {
          this.fd = fd;
          callback();
        }
      });
    }
    _read(n) {
      const buf = Buffer.alloc(n);
      fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
        if (err) {
          this.destroy(err);
        } else {
          this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
        }
      });
    }
    _destroy(err, callback) {
      if (this.fd) {
        fs.close(this.fd, (er) => callback(er || err));
      } else {
        callback(err);
      }
    }
  }

const fileToRead = '/files/fileToRead.txt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileToReadPath = path.join(__dirname, fileToRead)
  const pipelineInput = new ReadStream(fileToReadPath);
  const pipelineOutput =  process.stdout;
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

await read();