// Модуль с заполнением формы
import { getRandomPositiveInteger } from './utils.js';

/**
 * Функция перемешивает элементы массива
 * источник - https://habr.com/ru/post/358094/
 * @param {number} j - выбор случайного элемента
 */

const shuffle = (arrayCopy) => {
  let j, temp;
  //перебираем массив с последнего элемента
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    //выбираем случайный элемент массива - j
    j = Math.floor(Math.random() * (i + 1));
    // меняем местами с последним элементом
    temp = arrayCopy[j];
    arrayCopy[j] = arrayCopy[i];
    arrayCopy[i] = temp;
  }
  return arrayCopy;
};

/**
 * Функция создает копию массива с другим количеством и порядком элементов
 */
export const getNewArrayItems = (array) => {
  //создаем копию
  const arrayCopy = array.slice();
  //перемешиваем
  shuffle(arrayCopy);
  //случайное число
  const randomIndexItem = getRandomPositiveInteger(0, arrayCopy.length - 1);
  //возвращаем новый массив без случайного количества элементов
  return arrayCopy.slice(randomIndexItem);
};
// todo переменная в файле с формой, но разрывать не логично. Возможно, нужно переписать функцию.
