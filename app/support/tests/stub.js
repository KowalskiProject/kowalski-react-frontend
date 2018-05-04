import format from 'date-fns/format';

export const dummyBooleanFunction = () => true;
export const dummyStringFunction = () => 'dummy';
export const dummyIntlObject = { intl: {
  formatMessage: dummyStringFunction,
  formatDate: format,
} };
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
