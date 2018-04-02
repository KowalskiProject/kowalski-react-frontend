export const collectAllYields = (generator) => {
  const readableActionTypes = [];
  let generatorResult = generator.next().value;
  while (generatorResult) {
    readableActionTypes.push(generatorResult);
    generatorResult = generator.next().value;
  }
  return readableActionTypes;
};
