import { similarAdvertisement } from './arrays';

// В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
const typeHabitations = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

// шаблон #card, забираем то что будем копировать
const elementTemplate = document.querySelector('#card').content.querySelector('.popup');


//разметка похожих объявлений временно отображать в блоке, где должна быть карта.
const insertAdvertisement = document.querySelector('#map-canvas');

const similarElements = similarAdvertisement();

similarElements.forEach((advertisement) => {
  // клонирование шаблона
  const cardElement = elementTemplate.cloneNode(true);

  // вставляем данные
  const popupTitle = cardElement.querySelector('.popup__title');
  popupTitle.textContent = advertisement.offer.title;

  const popupAddress = cardElement.querySelector('.popup__text--address');
  popupAddress.textContent = advertisement.offer.address;

  // строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  const popupPrice = cardElement.querySelector('.popup__text--price');
  popupPrice.textContent = `${advertisement.offer.price}₽/ночь`;

  // ввод типов жилья
  const popupType = cardElement.querySelector('.popup__type');
  popupType.textContent = typeHabitations[advertisement.offer.type];

  // Выводит количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  const popupRoomsGuests = cardElement.querySelector('.popup__text--capacity');
  popupRoomsGuests.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;

  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  const popupCheckInOut = cardElement.querySelector('.popup__text--time');
  popupCheckInOut.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;

  // В список .popup__features выведите все доступные удобства в объявлении.
  const popupFeatures = cardElement.querySelector('.popup__features');
  popupFeatures.textContent = advertisement.offer.features;

  // В блок .popup__description выведите описание объекта недвижимости offer.description

  const popupDescription = cardElement.querySelector('.popup__description');
  popupDescription.textContent = advertisement.offer.description;

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  const popupPhotos = cardElement.querySelector('.popup__photos');
  popupPhotos.textContent = advertisement.offer.photos;

  // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  popupAvatar.src = advertisement.author.avatar;

  //отрисовать на карте
  insertAdvertisement.appendChild(cardElement);
});
