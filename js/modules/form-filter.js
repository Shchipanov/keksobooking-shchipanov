import { addPoints, markerGroup } from './map.js';

const formFilterElement = document.querySelector('.map__filters ');
const fildsetFilterElements =
  formFilterElement.querySelectorAll('select, input');

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

const filterType = (paramAdvertisement) => {
  const typeElement = formFilterElement.querySelector('#housing-type');
  return (
    typeElement.value === paramAdvertisement.offer.type ||
    typeElement.value === 'any'
  );
};

const filterRooms = (item) => {
  const roomsElement = formFilterElement.querySelector('#housing-rooms');
  return (
    Number(roomsElement.value) === Number(item.offer.rooms) ||
    roomsElement.value === 'any'
  );
};

const filterGuestsNumber = (item) => {
  const guestsNumberElement =
    formFilterElement.querySelector('#housing-guests');
  return (
    Number(guestsNumberElement.value) === Number(item.offer.guests) ||
    guestsNumberElement.value === 'any'
  );
};

const filterPrice = (item) => {
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
};

const filterFeatures = (item) => {
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
};

const filterMap = (paramData) => {
  markerGroup.clearLayers();

  const filtered = paramData
    .filter(filterType)
    .filter(filterRooms)
    .filter(filterGuestsNumber)
    .filter(filterPrice)
    .filter(filterFeatures);

  addPoints(filtered);
};

const setFilterChange = (cb) => {
  formFilterElement.addEventListener('change', () => {
    cb();
  });
};

export { disableFilterForm, enableFilterForm, filterMap, setFilterChange };
