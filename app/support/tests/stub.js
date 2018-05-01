export const dummyBooleanFunction = () => true;
export const dummyStringFunction = () => '';
export const dummyIntlObject = { formatMessage: dummyStringFunction };
export const mockLocalStorage = () => {
  const storage = {};

  window.localStorage = {
    getItem: (key) => storage[key],
    setItem: (key, value) => { storage[key] = value; },
  };
};
export const unmockLocalStorage = () => {
  window.localStorage = undefined;
};
