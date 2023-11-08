import constants from './constants.js';
import { generateArrayAdvertisments } from './modules/generate-advertisement.js';
// import { createCardElement,renderCard } from './modules/popup.js';
import { disableStatePage } from './modules/form.js';
import './validation.js';
import { initMap, addPoints } from './modules/map.js';
import { sendForm } from './validation.js';

//вызываем функцию генерации данных
const advertisments = generateArrayAdvertisments(constants.LIMITED_NUMBER_ADVERTISEMENT);

/** Создание карточки */
// const cardElements = advertisments.map(createCardElement);

/** Отрисовать на карте 1 карточку */
// renderCard(cardElements[0]);

/**При открытии страница находится в неактивном состоянии */
disableStatePage();
// disableMapFilters();

//Блокировка формы с фильтрами
// disableMapFilters();


initMap(constants.COORDINATE_MAP, constants.COUNT_MAP_ZOOM);

addPoints(advertisments);

/*fetch('https://26.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advertisments) => {
    // eslint-disable-next-line no-console
    console.log(advertisments);
  });*/
sendForm();
