import { disableFilterForm } from './form-filter.js';
import { disableForm } from './form.js';
import { disableSlider } from './form-slider.js';

const disablePage = () => {
  disableFilterForm();
  disableForm();
  disableSlider();
};

export { disablePage };
