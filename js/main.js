import constants from './constants.js';
import { initMap, addPoints } from './modules/map.js';
import { initForm, setUserFormSubmit } from './modules/form.js';
import {
  displayMessageError,
  displayMessageSuccess,
} from './modules/message.js';
import { getData } from './modules/api.js';
import { disablePage } from './modules/general.js';
import { setFilterChange, filterMap } from './modules/form-filter.js';
import { debounce } from './modules/util.js';

initForm();

disablePage();

initMap(constants.COORDINATE_MAP, constants.COUNT_MAP_ZOOM);

getData(addPoints, displayMessageError);

setUserFormSubmit(displayMessageSuccess);

getData((data) => {
  addPoints(data);
  setFilterChange(debounce(() => filterMap(data), constants.DEBOUNCE_DELAY));
}, displayMessageError);
