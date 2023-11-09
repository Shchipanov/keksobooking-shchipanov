import constants from './constants.js';
//import { generateArrayAdvertisments } from './modules/generate-advertisement.js';
// import { createCardElement,renderCard } from './modules/popup.js';
//import './form-validation.js';
import { initMap } from './modules/map.js';
import { disableFilterForm } from './modules/form-filter.js';
import { disableForm, initForm } from './modules/form.js';
import { disableSlider } from './modules/form-slider.js';

initForm();

// При открытии страница находится в неактивном состоянии
const disablePage = () => {
  disableFilterForm();
  disableForm();
  disableSlider();
};

disablePage();

initMap(constants.COORDINATE_MAP, constants.COUNT_MAP_ZOOM);

const getData = () => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      // eslint-disable-next-line
      console.log(data);
    });
};

getData();

//вызываем функцию генерации данных
//const advertisments = generateArrayAdvertisments(constants.LIMITED_NUMBER_ADVERTISEMENT);

/** Создание карточки */
// const cardElements = advertisments.map(createCardElement);

/** Отрисовать на карте 1 карточку */
// renderCard(cardElements[0]);

/**При открытии страница находится в неактивном состоянии */
//disableStatePage();
// disableMapFilters();

//Блокировка формы с фильтрами
// disableMapFilters();


//addPoints(advertisments);

/*fetch('https://26.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advertisments) => {
    // eslint-disable-next-line no-console
    console.log(advertisments);
  });*/
//sendForm();
