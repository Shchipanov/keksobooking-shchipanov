// import constants from './constants.js';
// import { generateArrayAdvertisments } from './modules/generate-advertisement.js';
// import { createCardElement,renderCard } from './modules/popup.js';
// import {disableForm, disableMapFilters} from './form.js';
// import './modules/validation.js';

//вызываем функцию генерации данных
// const advertisments = generateArrayAdvertisments(constants.LIMITED_NUMBER_ADVERTISEMENT);

/** Создание карточки */
// const cardElements = advertisments.map(createCardElement);

/** Отрисовать на карте 1 карточку */
// renderCard(cardElements[0]);

/**При открытии страница находится в неактивном состоянии */
// disableForm();
// disableMapFilters();

//Блокировка формы с фильтрами
// disableMapFilters();


const map = L.map('map-canvas')

  .setView({
    lat: 35.68952,
    lng: 139.69199,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
