import { mapElement } from './map.js';

// шаблон #card, забираем то что будем копировать
const elementTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

// В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
const typeHabitations = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

export const createCardElement = (paramAdvertisement) => {
  const cardElement = elementTemplate.cloneNode(true);

  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const roomsGuestsElement = cardElement.querySelector(
    '.popup__text--capacity'
  );
  const checkinOutElement = cardElement.querySelector('.popup__text--time');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const avatarElement = cardElement.querySelector('.popup__avatar');

  // вставляем данные
  titleElement.textContent = paramAdvertisement.offer.title;

  addressElement.textContent = paramAdvertisement.offer.address;

  // строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  priceElement.textContent = `${paramAdvertisement.offer.price}₽/ночь`;

  // ввод типов жилья
  typeElement.textContent = typeHabitations[paramAdvertisement.offer.type];

  // Выводит количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  roomsGuestsElement.textContent = `${paramAdvertisement.offer.rooms} комнаты для ${paramAdvertisement.offer.guests} гостей`;

  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  checkinOutElement.textContent = `Заезд после ${paramAdvertisement.offer.checkin}, выезд до ${paramAdvertisement.offer.checkout}`;

  // В блок .popup__description выведите описание объекта недвижимости offer.description
  descriptionElement.textContent = paramAdvertisement.offer.description;

  // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar
  avatarElement.src = paramAdvertisement.author.avatar;

  // В список .popup__features выведите все доступные удобства в объявлении.
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = paramAdvertisement.offer.features.map(
    (feature) => `popup__feature--${feature}`
  );

  featureList.forEach((featureListItem, i) => {
    if (!featureListItem.classList.contains(modifiers[i])) {
      featureListItem.remove();
    }
  });

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  const photoSrc = paramAdvertisement.offer.photos;
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photo = photosContainer.querySelector('.popup__photo');

  photoSrc.forEach((value, index) => {
    if (index === 0) {
      photo.src = value;
    } else {
      const photoClone = photo.cloneNode();
      photoClone.src = value;
      photosContainer.append(photoClone);
    }
  });

  return cardElement;
};

export const renderCard = (paramElements) => {
  mapElement.appendChild(paramElements);
};
