import constants from '../constants.js';

/** Создание слайдера
 * @param {} paramElement - элемент в котором отрисовывается слайдер
 * @param {} paramInput поле ввода значения
 */
const createSlider = (paramElement, paramInput) => {
  noUiSlider.create(paramElement, {
    range: {
      min: 0,
      max: constants.MAX_PRICE,
    },
    start: 0,
    step: 1000,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  paramElement.noUiSlider.on('update', () => {
    paramInput.value = paramElement.noUiSlider.get();
  });
  // TODO ************************************ Nikolay
  // paramElement.setAttribute('disabled', true);
  // ************************************
};

// TODO ************************************ Nikolay
// const disableSlider = () => {

// };

// const changeSliderRange = () => {

// };
// ************************************

//валидация слайдер

export { createSlider };
