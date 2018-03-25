/**
*
* Common validation functions to be use in field-level validation in redux-forms
*
*/

export const required = ((value) => (value) ? undefined : 'Campo obrigatório');
export const maxLength = (max) => (value) =>
  value && value.length > max ? `Deve ter ${max} caracteres ou menos` : undefined;
export const minLength = (min) => (value) =>
  value && value.length < min ? `Deve ter ${min} caracteres ou mais` : undefined;
export const number = (value) =>
  value && isNaN(Number(value)) ? 'Deve ser um número' : undefined;
export const minValue = (min) => (value) =>
  value && value < min ? `Deve ser no mínimo ${min}` : undefined;
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Endereço de email inválido'
    : undefined;
export const timeEntryFormat = (value) =>
  value && !/^\d{1,2}:\d{2}$/i.test(value)
    ? 'Formato inválido. Por favor forneça a duração on seguinte formato \'HH:mm\'.'
    : undefined;
