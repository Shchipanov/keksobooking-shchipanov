import { createSlider, disableSlider, enableSlider } from './slider.js';

/** Перевод формы в неактивное состояние */
const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');
const formFilterElement = document.querySelector('.map__filters ');
const fildsetFilterElements = formFilterElement.querySelectorAll('select, input');

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('.ad-form__value');

//создание слайдера
createSlider(sliderElement, valueElement);

//Состояния страницы
const disableElement = (form, fields) => {
  form.classList.add(`${form.className}--disabled`);
  fields.forEach((fild) => {
    fild.disabled = true;
  });
};

/** Приводит страницу в неактивное состояние */
const disableStatePage = () => {
  disableElement (formElement, fieldsetElements);
  disableElement (formFilterElement, fildsetFilterElements);
  disableSlider(sliderElement);
};

//todo есть дублирование кода. Не понятно как писать - classList.remove('.....-form--disabled')
const enableFilterForm = () => {
  formFilterElement.classList.remove('map__filters--disabled');
  fildsetFilterElements.forEach((fildsetFilterElement) => {
    fildsetFilterElement.disabled = false;
  });
};

const enableForm = () => {
  formElement.classList.remove('ad-form--disabled');
  for (const fieldElement of fieldsetElements) {
    fieldElement.disabled = false;
  }
};

/** Приводит страницу в активное состояние */
const enableStatePage = () => {
  enableForm();
  enableFilterForm();
  enableSlider(sliderElement);
};


//объединит все действия с формой: слайдер, валидация
const initForm = () => {

};

export { disableStatePage, enableStatePage, initForm };
