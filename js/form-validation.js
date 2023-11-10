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

  if (value === '1') {
    return capacityValue === '1';
  } else if (value === '2') {
    return capacityValue === '1' || capacityValue === '2';
  } else if (value === '3') {
    return (
      capacityValue === '1' || capacityValue === '2' || capacityValue === '3'
    );
  } else if (value === '100') {
    return capacityValue === '0';
  }
};

const getRoomNumberErrorMessage = (value) => {
  if (value === '1') {
    return 'Для 1 гостя';
  } else if (value === '2') {
    return 'Возможно не более 2х гостей';
  } else if (value === '3') {
    return 'Возможно не более 3х гостей';
  } else if (value === '100') {
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

  if (value === 'bungalow') {
    price.placeholder = 0;
    price.min = 0;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === 'flat') {
    price.placeholder = 1000;
    price.min = 1000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1000,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === 'hotel') {
    price.placeholder = 3000;
    price.min = 3000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 3000,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === 'house') {
    price.placeholder = 5000;
    price.min = 5000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 5000,
        max: constants.MAX_PRICE,
      },
    });
    return true;
  } else if (value === 'palace') {
    price.placeholder = 10000;
    price.min = 10000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 10000,
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
