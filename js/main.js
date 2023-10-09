import constants from './constants.js';
import { generateArrayAdvertisments } from './modules/generate-advertisement.js';
// import { createCardElement,renderCard } from './modules/popup.js';
// import { disableForm } from './modules/form.js';
import './validation.js';
import { initMap, addPoints } from './modules/map.js';

//вызываем функцию генерации данных
const advertisments = generateArrayAdvertisments(constants.LIMITED_NUMBER_ADVERTISEMENT);

/** Создание карточки */
// const cardElements = advertisments.map(createCardElement);

/** Отрисовать на карте 1 карточку */
// renderCard(cardElements[0]);

/**При открытии страница находится в неактивном состоянии */
// disableForm();
// disableMapFilters();

//Блокировка формы с фильтрами
// disableMapFilters();


initMap([35.68952, 139.69199]);

addPoints(advertisments);

const sliderElement = document.querySelector('.ad-form__slider');
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 50000,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('slice', (...rest) => {
  // eslint-disable-next-line no-console
  console.log(rest);
});
