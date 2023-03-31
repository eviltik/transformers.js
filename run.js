global.self = global;

const { pipeline, env } = require('./src/transformers.js')

// 2. Disable spawning worker threads for testing.
// This is done by setting numThreads to 1
//env.onnx.wasm.numThreads = 1;

env.useCache = 1;
env.localURL = './models';

async function go() {
  let pipe = await pipeline('summarization');
  let summary = await pipe("I am happy");
  console.log(summary);
}


go();