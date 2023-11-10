import { sendData } from './api.js';
import { initSlider } from './form-slider.js';
import { validateForm } from '../form-validation.js';
import { displayMessageError } from './message.js';

/** Перевод формы в неактивное состояние */
const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');
const addressElement = document.querySelector('#address');

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
  initSlider();
  addressElement.readonly = true;
};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      sendData(
        new FormData(evt.target),
        () => {
          onSuccess();
        },
        () => {
          displayMessageError();
        }
      );
    }
  });
};

export { disableForm, enableForm, initForm, setUserFormSubmit };
