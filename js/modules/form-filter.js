const formFilterElement = document.querySelector('.map__filters ');
const fildsetFilterElements = formFilterElement.querySelectorAll('select, input');

const disableFilterForm = () => {
  formFilterElement.classList.add('map__filters--disabled');
  fildsetFilterElements.forEach((fildsetFilterElement) => {
    fildsetFilterElement.disabled = true;
  });
};

const enableFilterForm = () => {
  formFilterElement.classList.remove('map__filters--disabled');
  fildsetFilterElements.forEach((fildsetFilterElement) => {
    fildsetFilterElement.disabled = false;
  });
};

export {disableFilterForm, enableFilterForm};
