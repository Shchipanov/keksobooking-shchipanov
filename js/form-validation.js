import constants from './constants.js';

const formElement = document.querySelector('.ad-form');
const sliderElement = document.querySelector('.ad-form__slider');
const titleElement = formElement.querySelector('#title');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const timeParentElement = formElement.querySelector('.ad-form__element--time');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
//const addressElement = document.querySelector('#address');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

/** Проверка поля заголовок */
const validateTitle = (value) => value.length >= constants.TITLE_MIN && value.length <= constants.TITLE_MAX;
pristine.addValidator(
  titleElement,
  validateTitle,
  `Заголовок не менее ${constants.TITLE_MIN} и не более ${constants.TITLE_MAX} символов`
);

/**Проверка поля Цена */
const validatePrice = (value) => value >= 0 && value <= constants.MAX_PRICE;
pristine.addValidator(
  priceElement,
  validatePrice,
  `Максимальное значение ${constants.MAX_PRICE}`
);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

const validateRoomNumber = (value) => {
  const capacityValue = capacityElement.value;

  if (value === constants.GuestsCount.ONE) {
    return capacityValue === constants.GuestsCount.ONE;
  } else if (value === constants.GuestsCount.TWO) {
    return (
      capacityValue === constants.GuestsCount.ONE ||
      capacityValue === constants.GuestsCount.TWO);
  } else if (value === constants.GuestsCount.THREE) {
    return (
      capacityValue === constants.GuestsCount.ONE ||
      capacityValue === constants.GuestsCount.TWO ||
      capacityValue === constants.GuestsCount.THREE);
  } else if (value === constants.GuestsCount.ZERO) {
    return capacityValue === constants.GuestsCount.ZERO;
  }
};

const getRoomNumberErrorMessage = (value) => {
  if (value === constants.RoomsCount.ONE) {
    return `Для ${constants.GuestsCount.ONE} гостя`;
  } else if (value === constants.RoomsCount.TWO) {
    return `Возможно не более ${constants.GuestsCount.TWO}х гостей`;
  } else if (value === constants.RoomsCount.THREE) {
    return `Возможно не более ${constants.GuestsCount.THREE}х гостей`;
  } else if (value === constants.RoomsCount.HUNDRED) {
    return 'Не для гостей';
  }
};

pristine.addValidator(
  roomNumberElement,
  validateRoomNumber,
  getRoomNumberErrorMessage
);

capacityElement.addEventListener('change', () => {
  pristine.validate(roomNumberElement);
});

const validateType = (value) => {
  const price = priceElement;

  if (value === constants.HousingType.BUNGALOW) {
    price.placeholder = constants.MinPriceLimit.BUNGALOW;
    price.min = constants.MinPriceLimit.BUNGALOW;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: constants.MinPriceLimit.BUNGALOW,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === constants.HousingType.FLAT) {
    price.placeholder = constants.MinPriceLimit.FLAT;
    price.min = constants.MinPriceLimit.FLAT;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: constants.MinPriceLimit.FLAT,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === constants.HousingType.HOTEL) {
    price.placeholder = constants.MinPriceLimit.HOTEL;
    price.min = constants.MinPriceLimit.HOTEL;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: constants.MinPriceLimit.HOTEL,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === constants.HousingType.HOUSE) {
    price.placeholder = constants.MinPriceLimit.HOUSE;
    price.min = constants.MinPriceLimit.HOUSE;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: constants.MinPriceLimit.HOUSE,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === constants.HousingType.PALACE) {
    price.placeholder = constants.MinPriceLimit.PALACE;
    price.min = constants.MinPriceLimit.PALACE;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: constants.MinPriceLimit.PALACE,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  }
};

pristine.addValidator(typeElement, validateType);

/**Синхронизация «Время заезда», «Время выезда». */
timeParentElement.addEventListener('change', (evt) => {
  timeInElement.value = evt.target.value;
  timeOutElement.value = evt.target.value;
});

export { pristine };
