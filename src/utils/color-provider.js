
const defaultColorSchema = [
  '#6aedc7',
  '#39c2c9',
  '#ffce00',
  '#ffa71a',
  '#f866b9',
  '#998ce3'
];

// babel-polyfill ~85KB minified
// package minified bundle ~13KB
// KISS

// function* colorProvider(colorSchema = defaultColorSchema) {
//   for (let currentColorNumber = 0; ; currentColorNumber = (currentColorNumber + 1) % colorSchema.length) {
//     yield colorSchema[currentColorNumber];
//   }
// }

function colorProvider(colorSchema = defaultColorSchema) {
  let currentColorNumber = 0;

  function next() {
    const color = colorSchema[currentColorNumber];
    currentColorNumber = (currentColorNumber + 1) % colorSchema.length;
    return { value: color, done: false };
  }

  function schema(_schema) {
    if (!arguments.length) {
      return colorSchema;
    }
    colorSchema = _schema;
    currentColorNumber = 0;
    return this;
  }

  return {
    next,
    schema
  };
}

export {
  colorProvider,
  defaultColorSchema
};
