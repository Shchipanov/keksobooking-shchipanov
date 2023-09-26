const formElement = document.querySelector('.ad-form');

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
pristine.addValidator(formElement.querySelector('#title'), validateTitle, 'Заголовок не менее 30 и не более 100 символов');

/**Проверка поля Цена */
const validatePrice = (value) => value >= 0 && value <= 100000;
pristine.addValidator(formElement.querySelector('#price'), validatePrice, 'Максимальное значение 100 000');

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

const validateRoomNumber = function (value) {
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

const getRoomNumberErrorMessage = function (value) {
  if (value === '1') {
    return 'для 1 гостя';
  } else if (value === '2') {
    return 'Возможно не более 2х гостей';
  } else if (value === '3') {
    return 'Возможно не более 3 гостей';
  } else if (value === '100') {
    return 'Не для гостей';
  }
};

pristine.addValidator(
  formElement.querySelector('#room_number'),
  validateRoomNumber,
  getRoomNumberErrorMessage
);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

