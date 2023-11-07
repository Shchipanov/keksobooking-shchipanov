import { createSlider } from './slider.js';

/** Перевод формы в неактивное состояние */
const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('.ad-form__value');

//создание слайдера
createSlider(sliderElement, valueElement);

// TODO Слайдер также должен быть заблокирован - он в fieldset. Дополнительная блокирвока по классу ad-form__slider не сделана.
/** Перевод формы в неактивное состояние */
const disableForm = () => {
  formElement.classList.add('ad-form--disabled');
  for (const fieldElement of fieldsetElements) {
    fieldElement.disabled = true;
  }
};

/** Перевод формы в активное состояние */
// TODO временное отключение проверки
// eslint-disable-next-line no-unused-vars
const enableForm = () => {
  formElement.classList.remove('ad-form--disabled');
  for (const fieldElement of fieldsetElements) {
    fieldElement.disabled = false;
  }
};

/** Блокировка формы с фильтрами */
const filterElement = document.querySelector('.map__filters');
const selectElements = filterElement.querySelectorAll('select');
const disableMapFilters = () => {
  filterElement.classList.add('map__filters--disabled');
  for (const selectElement of selectElements) {
    selectElement.disabled = true;
  }
};

/** Разблокировка формы с фильтрами */
// TODO временное отключение проверки
// eslint-disable-next-line no-unused-vars
const enableMapFilters = () => {
  filterElement.classList.remove('map__filters--disabled');
  for (const selectElement of selectElements) {
    selectElement.disabled = false;
  }
};


//объединит все действия с формой: слайдер, валидация
const initForm = () => {

};

valueElement.addEventListener('input', () => {
  sliderElement.noUiSlider.updateOptions(
    {
      start: `${valueElement.value}`
    }
  );
});

export { disableForm, disableMapFilters, enableForm, initForm };
