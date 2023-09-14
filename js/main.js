import constants from './constants.js';
import { generateArrayAdvertisments } from './modules/generate-advertisement.js';
import { createCardElement,renderCard } from './modules/popup.js';
//import { makesDisabledForm } from './form.js';

//вызываем функцию генерации данных
const advertisments = generateArrayAdvertisments(constants.LIMITED_NUMBER_ADVERTISEMENT);

/** Создание карточки */
const cardElements = advertisments.map(createCardElement);

/** Отрисовать на карте 1 карточку */
renderCard(cardElements[0]);

//makesDisabledForm();
