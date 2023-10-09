/** Создание слайдера
 * @param {} paramElement - элемент в котором отрисовывается слайдер
 * @param {} paramInput поле ввода значения
 */
const createSlider = (paramElement, paramInput) => {
  noUiSlider.create(paramElement, {
    range: {
      min: 0,
      max: 100000,
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
};

// //обновление значения слайдера
// valueElement.addEventListener('input', () => {
//   sliderElement.noUiSlider.updateOptions(
//     {
//       start: `${valueElement.value}`
//     }
//   );
// });

export { createSlider };
