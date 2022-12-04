import { pipeline, Transform } from 'stream';

class ReverseTransformer extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const source = chunk.toString('utf8');
    const destination = source.split('').reverse().join('');
    this.push(destination);
    callback();
  }
}

const transform = async () => {
  const pipelineInput = process.stdin;
  const pipelineOutput =  process.stdout;
  const transformer = new ReverseTransformer();

  pipeline(
    pipelineInput,
    transformer,
    pipelineOutput,
    (err) => {
      if (err) {
        process.stderr.write(`${err.name}: ${err.message}`);
        process.exit(-1);
      }
    }
  );
}

await transform();