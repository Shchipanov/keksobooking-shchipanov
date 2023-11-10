import { enableForm } from './form.js';
import { createCardElement } from './cards.js';
import constants from '../constants.js';
import { enableFilterForm } from './form-filter.js';
import { enableSlider } from './form-slider.js';

const addressElement = document.querySelector('#address');
const formElement = document.querySelector('.ad-form');
const map = L.map('map-canvas');

// блок отрисовки главной метки
const pinIconElement = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinMarkerElement = L.marker(
  constants.COORDINATE_MAP,
  {
    draggable: true,
    icon: pinIconElement,
  }
);

/** перевод страницы в активное состояние */
const enablePage = () => {
  enableForm();
  enableFilterForm();
  enableSlider();
};

/** Отрисовка карты
 * @param {object} coordinate geographical coordinates
 * @param {Number} count  zoom level
 */
const initMap = (coordinate, count) => {
  map.on('load', () => {
    enablePage();
  });
  map.setView(coordinate, count);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  pinMarkerElement.setLatLng(coordinate).addTo(map);
};

pinMarkerElement.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  formElement.querySelector('#address').value = `${lat.toFixed(
    5
  )}, ${lng.toFixed(5)}`;
});

/**Создание слоя и добавление на карту */
const markerGroup = L.layerGroup().addTo(map);

// блок отрисовки похожих объявлений
const pinIconSimilarElement = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (paramPoint) => {
  const { lat, lng } = paramPoint.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      pinIconSimilarElement,
    }
  );
  marker.addTo(markerGroup).bindPopup(createCardElement(paramPoint));
};

const addPoints = (paramData) => {
  paramData.slice(0, constants.NUMBER_MARKERS).forEach((paramPoint) => {
    createMarker(paramPoint);
  });
  pinMarkerElement.addTo(markerGroup);
};

// возвращает начальные значения
const resetMap = () => {
  addressElement.value = `${constants.COORDINATE_MAP.lat}, ${constants.COORDINATE_MAP.lng}`;
  pinMarkerElement.setLatLng(constants.COORDINATE_MAP);
  map.setView(constants.COORDINATE_MAP, constants.COUNT_MAP_ZOOM);
};

const clearPinMarkers = () => markerGroup.clearLayers();

export { initMap, addPoints, clearPinMarkers, resetMap };
