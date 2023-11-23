const popupTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const typeHabitations = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCardElement = (paramAdvertisement) => {
  const cardElement = popupTemplate.cloneNode(true);

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

  if (!paramAdvertisement.offer.title) {
    paramAdvertisement.offer.title.remove();
  } else {
    titleElement.textContent = paramAdvertisement.offer.title;
  }

  if (!paramAdvertisement.offer.address) {
    paramAdvertisement.offer.address.remove();
  } else {
    addressElement.textContent = paramAdvertisement.offer.address;
  }

  if (!paramAdvertisement.offer.price) {
    paramAdvertisement.offer.price.remove();
  } else {
    priceElement.textContent = `${paramAdvertisement.offer.price} ₽/ночь`;
  }

  if (!paramAdvertisement.author.avatar) {
    paramAdvertisement.author.avatar.remove();
  } else {
    avatarElement.src = paramAdvertisement.author.avatar;
  }

  checkinOutElement.textContent = `Заезд после ${paramAdvertisement.offer.checkin}, выезд до ${paramAdvertisement.offer.checkout}`;
  typeElement.textContent = typeHabitations[paramAdvertisement.offer.type];
  roomsGuestsElement.textContent = `${paramAdvertisement.offer.rooms} комнаты для ${paramAdvertisement.offer.guests} гостей`;

  if (!paramAdvertisement.offer.description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = paramAdvertisement.offer.description;
  }

  const featuresContainerElement =
    cardElement.querySelector('.popup__features');
  if (
    !paramAdvertisement.offer.features ||
    paramAdvertisement.offer.features.length === 0
  ) {
    featuresContainerElement.remove();
  } else {
    featuresContainerElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    paramAdvertisement.offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${feature}`);
      fragment.appendChild(featureElement);
    });
    featuresContainerElement.appendChild(fragment);
  }

  const photosContainerElement = cardElement.querySelector('.popup__photos');
  if (paramAdvertisement.offer.photos.length === 0
  ) {
    photosContainerElement.remove();
  } else {
    const photoElement = cardElement.querySelector('.popup__photo');
    const photoFragment = document.createDocumentFragment();
    paramAdvertisement.offer.photos.forEach((photoSrc) => {
      const photoItem = photoElement.cloneNode(true);
      photoItem.src = photoSrc;
      photoFragment.appendChild(photoItem);
    });
    photosContainerElement.innerHTML = '';
    photosContainerElement.appendChild(photoFragment);
  }
  return cardElement;

};

export { createCardElement };
