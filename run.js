const { pipeline, env } = require('./src/transformers.js')

// 2. Disable spawning worker threads for testing. This is done by setting numThreads to 1
//env.onnx.wasm.numThreads = 1;

env.useCache = 1;
env.localURL = './models';
//env.remoteURL = 'https://huggingface.co/Xenova/transformers.js/resolve/main/quantized/',
env.remoteURL = 'https://huggingface.co/';
env.remoteModels = false;

async function go() {
  let pipe = await pipeline('translation', 'onnx/quantized/Helsinki-NLP/opus-mt-ru-en');
  //let pipe = await pipeline('translation', 'Helsinki-NLP/opus-mt-ru-en/resolve/main');
  //let pipe = await pipeline('translation', 'google/mt5-small'); // bug => [ { translation_text: '<extra_id_0>: 1' } ]
  //let pipe = await pipeline('translation', 'google/t5-v1_1-base');
  let summary = await pipe("Впервые в истории США экс-президент становится фигурантом уголовного дела. Большое жюри Манхэттена в четверг вечером проголосовало за предъявление Дональду Трампу обвинения по делу о предполагаемых выплатах порнозвезде Сторми Дэниелс. Решение жюри стало неожиданностью как для экс-президента, так и для его команды, считавшей, что прокурор откажется от этого дела из-за его крайней запутанности. Теперь бывший президент должен явиться в суд для дачи показаний.");
  console.log(summary);
}

async function goGerman() {
  let pipe = await pipeline('translation', 't5-small'); // anglais vers allemand
  let summary = await pipe("translate in german: The ex-president’s response was vintage, fire-breathing, capital-letter Trump: This is Political Persecution and Election Interference at the highest level in history. From the time I came down the golden escalator at Trump Tower, and even before I was sworn in as your President of the United States, the Radical Left Democrats — the enemy of the hard-working men and women of this Country — have been engaged in a Witch-Hunt to destroy the Make America Great Again movement.");
  // ==> Auf zwei Jahre hatte Trump in der deutschen Protestkampagne den Rekord an der Grenze, in der ich der Opposition im November den Silberstein des Trump Towers fiel, und ich habe das Kommando mit dem politischen Verbrechen erlassen, indem ich zum Protest gegen den Friedenskrieg geführt habe, wobei ich sogar den traditionellen Kampf gegen die Machtkämpfe verteidigt hatte, auf denen der ehemalige Premierminister wandte.
}

async function goGerman2() {
  let pipe = await pipeline('translation', 'xt5-base'); // anglais vers allemand
  let summary = await pipe("translate in german: This is Political Persecution and Election Interference at the highest level in history.");
  console.log(summary);
  // ==> Auf zwei Jahre hatte Trump in der deutschen Protestkampagne den Rekord an der Grenze, in der ich der Opposition im November den Silberstein des Trump Towers fiel, und ich habe das Kommando mit dem politischen Verbrechen erlassen, indem ich zum Protest gegen den Friedenskrieg geführt habe, wobei ich sogar den traditionellen Kampf gegen die Machtkämpfe verteidigt hatte, auf denen der ehemalige Premierminister wandte.
}

go();

//[ { translation_text: '« Hey, dar, was?' } ]
