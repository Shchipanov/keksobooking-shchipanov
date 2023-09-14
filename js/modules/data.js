import { getRandomPositiveInteger } from './utils.js';

// работа с массивами
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


// Массивы
export const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

export const checkins = ['12:00', '13:00', '14:00'];

export const checkouts = ['12:00', '13:00', '14:00'];

export const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

export const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.]',
];

// Строки
export const title = 'У нас лучшие апартаменты.';
export const description = 'comfort in every element.';
