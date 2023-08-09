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

const generatedNumber = getRandomNumber(50, 500, 4);
//todo служебное сообщение
// eslint-disable-next-line no-console
console.log(generatedNumber);
