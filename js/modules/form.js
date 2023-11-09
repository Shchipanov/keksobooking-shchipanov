import { createSlider } from './form-slider.js';

/** Перевод формы в неактивное состояние */
const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');

const disableForm = () => {
  formElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((fieldElement) => {
    fieldElement.disabled = true;
  });
};

const enableForm = () => {
  formElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach((fieldElement) => {
    fieldElement.disabled = false;
  });
};

//объединит все действия с формой: слайдер, валидация
const initForm = () => {
  createSlider();
};

// TODO Nikolay: плохой нейминг
// eslint-disable-next-line
const sendForm = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // eslint-disable-next-line
    const formData = new FormData(evt.target);
    // eslint-disable-next-line
    if (pristine.validate()) {
      // TODO вставить заглушки Nikolay
      // sendData(formDate, () => {}, () => {});

      // sendData(formData, displayMessageError);
    }
  });
};

export { disableForm, enableForm, initForm };
