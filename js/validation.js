import { sendData } from './modules/api.js';
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
const addressElement = document.querySelector('#address');

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

// Запрет ручного редактирования поля Адрес(координаты)
addressElement.readonly = true;

// Если при отправке данных произошла ошибка запроса,
// показывается соответствующее сообщение. Разметку сообщения,
// которая находится в блоке #error в шаблоне template, нужно
// разместить перед закрывающим тегом </body>.
// Сообщение должно исчезать после нажатия на кнопку
// .error__button, по нажатию на клавишу Esc и
// по клику на произвольную область экрана.
// В таком случае вся введённая пользователем информация
// сохраняется, чтобы у него была возможность отправить форму повторно.

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

//Создает сообщение об успешно отправленной форме
// todo не закрывается + timeOut

const displayMessageSuccess = () => {
  const successMessageElement = successTemplate.cloneNode(true);
  document.appendChild(successMessageElement);
};

/**Ошибка при отправке формы */
const displayMessageError = (error) => {
  // появление окна с ошибкой
  const errorMessageElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessageElement);
  // сообщение
  const errorText = document.querySelector('.error__message');
  errorText.textContent = error;

  // удаление окна
  const closeError = () => {
    errorMessageElement.remove();
    //document.removeEventListener('keydown', eventOnEsc);
  };

  //после нажатия на  .error__button
  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.addEventListener('click', closeError);
  // по нажатию на клавишу Esc
  const eventOnEsc = (evt) => {
    if (evt.keyCode === 27) {
      closeError();
    }
  };
  document.addEventListener('keydown', eventOnEsc);

};

const sendForm = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    if (pristine.validate()) {
      sendData(formData, displayMessageError);
    }
  });
};

export { sendForm, displayMessageSuccess };
