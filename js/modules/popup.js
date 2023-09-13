import { similarAdvertisement, generateAdvertisement } from './arrays';

export const typeHabitations = new Map();
typeHabitations.set = ('flat', 'Квартира');
typeHabitations.set = ('bungalow', 'Бунгало');
typeHabitations.set = ('house', 'Дом');
typeHabitations.set = ('palace', 'Дворец');
typeHabitations.set = ('hotel', 'Отель');

// шаблон #card, забираем то что будем копировать
const elementTemplate = document.querySelector('#card').content.querySelector('.popup');


//разметка похожих объявлений временно отображать в блоке, где должна быть карта.
const insertAdvertisement = document.querySelector('#map-canvas');

const similarElements = similarAdvertisement();

generateAdvertisement();

similarElements.forEach(()=> {
  // клонирование шаблона
  const cardElement = elementTemplate.cloneNode(true);

  // вставляем данные
  const popupTitle = cardElement.querySelector('.popup__title');
  popupTitle.textContent = offer.title;

  const popupAddress = cardElement.querySelector('.popup__text--address');
  popupAddress.textContent = offer.address;

  // строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  const popupPrice = cardElement.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price}₽/ночь`;

  // ввод типов жилья
  const popupType = cardElement.querySelector('.popup__type');
  popupType.textContent = typeHabitations.get(offer.type);

  // Выводит количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  const popupRoomsGuests = cardElement.querySelector('.popup__text--capacity');
  popupRoomsGuests.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  const popupCheckInOut = cardElement.querySelector('.popup__text--time');
  popupCheckInOut.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  // В список .popup__features выведите все доступные удобства в объявлении.
  const popupFeatures = cardElement.querySelector('.popup__features');
  // popupFeatures.textContent =

  // В блок .popup__description выведите описание объекта недвижимости offer.description

  const popupDescription = cardElement.querySelector('.popup__description');
  popupDescription.textContent = offer.description;

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

  // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  popupAvatar.src = author.avatar;

  //отрисовать на карте
  insertAdvertisement.appendChild(cardElement);
});
