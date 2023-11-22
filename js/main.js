import constants from './constants.js';
import { initMap, setAds, renderPoints } from './modules/map.js';
import { initForm, setUserFormSubmit } from './modules/form.js';
import {
  displayMessageError,
  displayMessageSuccess,
} from './modules/message.js';
import { getData } from './modules/api.js';
import { disablePage } from './modules/general.js';
import { initFilters, filterAds } from './modules/form-filter.js';
import { debounce } from './modules/util.js';

initForm();

disablePage();

initMap(constants.COORDINATE_MAP, constants.COUNT_MAP_ZOOM);

//getData(addPoints, displayMessageError);

setUserFormSubmit(displayMessageSuccess);

getData((ads) => {
  setAds(ads);
  renderPoints(ads);
  const onFilterChangeWithDebounce = debounce(filterAds, constants.DEBOUNCE_DELAY);
  initFilters(onFilterChangeWithDebounce);
}, displayMessageError);
