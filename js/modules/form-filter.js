import constants from '../constants.js';
import { clearMap, getAds, renderPoints } from './map.js';

const formFilterElement = document.querySelector('.map__filters ');
const fieldsetFilterElements =
  formFilterElement.querySelectorAll('select, input');
const housingTypeElement = formFilterElement.querySelector('#housing-type');
const roomsElement = formFilterElement.querySelector('#housing-rooms');
const guestsNumberElement = formFilterElement.querySelector('#housing-guests');
const priceElement = formFilterElement.querySelector('#housing-price');
const featuresElement = formFilterElement.querySelector('#housing-features');

const disableFilterForm = () => {
  formFilterElement.classList.add('map__filters--disabled');
  fieldsetFilterElements.forEach((fieldsetFilterElement) => {
    fieldsetFilterElement.disabled = true;
  });
};

const enableFilterForm = () => {
  formFilterElement.classList.remove('map__filters--disabled');
  fieldsetFilterElements.forEach((fieldsetFilterElement) => {
    fieldsetFilterElement.disabled = false;
  });
};

/*const filterType = (paramAdvertisement) => {
  const typeElement = formFilterElement.querySelector('#housing-type');
  return (
    typeElement.value === paramAdvertisement.offer.type ||
    typeElement.value === 'any'
  );
};*/
const checkHousingType = (housingType) =>
  housingTypeElement.value === 'any' ||
  housingType === housingTypeElement.value;

/*const filterRooms = (item) => {
  const roomsElement = formFilterElement.querySelector('#housing-rooms');
  return (
    Number(roomsElement.value) === Number(item.offer.rooms) ||
    roomsElement.value === 'any'
  );
};*/
const checkRooms = (rooms) =>
  roomsElement.value === 'any' || rooms === Number(roomsElement.value);

/*const filterGuestsNumber = (item) => {
  const guestsNumberElement =
    formFilterElement.querySelector('#housing-guests');
  return (
    Number(guestsNumberElement.value) === Number(item.offer.guests) ||
    guestsNumberElement.value === 'any'
  );
};*/
const checkGuestsNumber = (guestsCount) =>
  guestsNumberElement.value === 'any' ||
  guestsCount === Number(guestsNumberElement.value);

/*const filterPrice = (item) => {
  const priceElement = formFilterElement.querySelector('#housing-price');
  if (priceElement.value === 'any') {
    return item.offer.price;
  }
  if (priceElement.value === 'middle') {
    return item.offer.price >= 10000 && item.offer.price <= 50000;
  }
  if (priceElement.value === 'low') {
    return item.offer.price < 10000;
  }
  if (priceElement.value === 'high') {
    return item.offer.price > 50000;
  }

  return false;
};*/
const checkPrice = (price) => {
  switch (priceElement.value) {
    case constants.PRICE_TYPE.ANY:
      return true;

    case constants.PRICE_TYPE.LOW:
      return price < constants.PRICE_RANGE.MIDDLE;

    case constants.PRICE_TYPE.MIDDLE:
      return (
        price >= constants.PRICE_RANGE.MIDDLE &&
        price < constants.PRICE_RANGE.HIGH
      );

    case constants.PRICE_TYPE.HIGH:
      return price > constants.PRICE_RANGE.HIGH;

    default:
      return false;
  }
};

/*const filterFeatures = (item) => {
  const filtersFeatures = [];
  const checkedFilters = document
    .querySelector('.map__features')
    .querySelectorAll('input:checked');
  checkedFilters.forEach((element) => filtersFeatures.push(element.value));
  if (item.offer.features) {
    return filtersFeatures.every((feature) =>
      item.offer.features.includes(feature)
    );
  }
  return false;
};*/
const checkFeatures = (features, checkedFeatures) =>
  checkedFeatures.every((checkedFeature) => features.includes(checkedFeature));

/*const filterMap = (paramData) => {
  markerGroup.clearLayers();

  const filtered = paramData
    .filter(filterType)
    .filter(filterRooms)
    .filter(filterGuestsNumber)
    .filter(filterPrice)
    .filter(filterFeatures);

  addPoints(filtered);
};*/
const filterAds = () => {
  clearMap();

  const ads = getAds();
  const checkedFeaturesElements = featuresElement.querySelectorAll(
    '.map__checkbox:checked'
  );
  const checkedFeatures = Array.from(checkedFeaturesElements).map(
    (element) => element.value
  );
  const filteredAds = [];
  for (const ad of ads) {
    const { offer } = ad;
    if (
      checkHousingType(offer.type) &&
      checkRooms(offer.rooms) &&
      checkGuestsNumber(offer.guests) &&
      checkPrice(offer.price) &&
      checkFeatures(offer.features || [], checkedFeatures)
    ) {
      filteredAds.push(ad);
    }

    if (filteredAds.length >= constants.MAX_POINTS_RENDER_LIMIT) {
      break;
    }
  }

  renderPoints(filteredAds);
};

/*const setFilterChange = (cb) => {
  formFilterElement.addEventListener('change', () => {
    cb();
  });
};*/
const initFilters = (cb) => {
  formFilterElement.addEventListener('change', cb);
};

export { disableFilterForm, enableFilterForm, filterAds, initFilters };
