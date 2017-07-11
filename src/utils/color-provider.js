
const defaultColorSchema = [
  '#6aedc7',
  '#39c2c9',
  '#ffce00',
  '#ffa71a',
  '#f866b9',
  '#998ce3'
];

function colorProvider(colorSchema = defaultColorSchema) {
  let currentColorNumber = 0;
  const savedColors = {};

  /**
   * Get new color. If it called with key param, returned value will be saved
   * and will return every new call with same identificator.
   * @param {string} [key] - Color identificator
   */
  function next(key) {
    const color = arguments.length ?
      savedColors[key] = savedColors[key] || getNextColor() :
      getNextColor();

    return { value: color, done: false };
  }

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
    next,
    schema
  };
}

export {
  colorProvider,
  defaultColorSchema
};
