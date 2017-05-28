
const defaultColorSchema = [
  '#6aedc7',
  '#39c2c9',
  '#ffce00',
  '#ffa71a',
  '#f866b9',
  '#998ce3'
];

function colorProvider() {
  let currentColorNumber = 0;
  let colorSchema = defaultColorSchema;

  function getNextColor() {
    const color = colorSchema[currentColorNumber];
    currentColorNumber = (currentColorNumber + 1) % colorSchema.length;
    return color;
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
    getNextColor,
    schema
  };
}

export {
  colorProvider,
  defaultColorSchema
};
