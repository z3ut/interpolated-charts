
const defaultColorSchema = [
  '#6aedc7',
  '#39c2c9',
  '#ffce00',
  '#ffa71a',
  '#f866b9',
  '#998ce3'
];

function* colorProvider(colorSchema = defaultColorSchema) {
  for (let currentColorNumber = 0; ; currentColorNumber = (currentColorNumber + 1) % colorSchema.length) {
    yield colorSchema[currentColorNumber];
  }
}

export {
  colorProvider,
  defaultColorSchema
};
