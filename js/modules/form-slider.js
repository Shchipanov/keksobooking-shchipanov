import constants from '../constants.js';

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('.ad-form__value');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
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

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
};

const disableSlider = () => {
  sliderElement.setAttribute('disabled', '');
  const origins = sliderElement.querySelectorAll('.noUi-origin');
  origins[0].setAttribute('disabled', '');
};

const enableSlider = () => {
  sliderElement.removeAttribute('disabled');
  const origins = sliderElement.querySelectorAll('.noUi-origin');
  origins[0].removeAttribute('disabled');
};

export { createSlider, enableSlider, disableSlider };
