import { sendData } from './api.js';

const formElement = document.querySelector('.ad-form');
const sliderElement = document.querySelector('.ad-form__slider');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

/** Проверка поля заголовок */
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(
  formElement.querySelector('#title'),
  validateTitle,
  'Заголовок не менее 30 и не более 100 символов'
);

/**Проверка поля Цена */
const validatePrice = (value) => value >= 0 && value <= 100000;
pristine.addValidator(
  formElement.querySelector('#price'),
  validatePrice,
  'Максимальное значение 100 000'
);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

const validateRoomNumber = (value) => {
  const capacityValue = formElement.querySelector('#capacity').value;

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
  formElement.querySelector('#room_number'),
  validateRoomNumber,
  getRoomNumberErrorMessage
);

const validateType = (value) => {
  const price = formElement.querySelector('#price');

  if (value === 'bungalow') {
    price.placeholder = 0;
    price.min = 0;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100000,
      },
    });
    return true;
  } else if (value === 'flat') {
    price.placeholder = 1000;
    price.min = 1000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1000,
        max: 100000,
      },
    });
    return true;
  } else if (value === 'hotel') {
    price.placeholder = 3000;
    price.min = 3000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 3000,
        max: 100000,
      },
    });
    return true;
  } else if (value === 'house') {
    price.placeholder = 5000;
    price.min = 5000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 5000,
        max: 100000,
      },
    });
    return true;
  } else if (value === 'palace') {
    price.placeholder = 10000;
    price.min = 10000;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 10000,
        max: 100000,
      },
    });
    return true;
  }
};

pristine.addValidator(formElement.querySelector('#type'), validateType);

// Если при отправке данных произошла ошибка запроса,
// показывается соответствующее сообщение. Разметку сообщения,
// которая находится в блоке #error в шаблоне template, нужно
// разместить перед закрывающим тегом </body>.
// Сообщение должно исчезать после нажатия на кнопку
// .error__button, по нажатию на клавишу Esc и
// по клику на произвольную область экрана.
// В таком случае вся введённая пользователем информация
// сохраняется, чтобы у него была возможность отправить форму повторно.

// const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

/**Создает сообщение об успешно отправленной форме */
// const displayMessageSuccess = () => {
//   const successMessageElement = successTemplate.cloneNode(true);
//   document.appendChild(successMessageElement);
// };

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
    document.removeEventListener('keydown', eventOnEsc);
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

export { sendForm };
