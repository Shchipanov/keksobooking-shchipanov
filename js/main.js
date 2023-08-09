/**
 * Функция для получения случайного числа
 * https://javascript.ru/Math.Random
 * @param {number} min - минимальное значение диапазона;
 * @param {number} max - максимальное значение диапазона;
 * @param {number} grade - количество знаков после запятой;
 * @returns {number}
 */

//todo Не добавлена проверка на отрицательное значение grade, тк есть в самом методе to.Fixed

const getRandomNumber = (min, max, grade) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Неверное значение диапазона.');
  }

  let randomNumber = Math.random() * (max - min) + min;
  randomNumber = +randomNumber.toFixed(grade);
  return randomNumber;
};

const generatedNumber = getRandomNumber(25, 500, 4);
//todo служебное сообщение
// eslint-disable-next-line no-console
console.log(generatedNumber);

// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//todo служебное сообщение
// eslint-disable-next-line no-console
console.log(getRandomInt(5));
