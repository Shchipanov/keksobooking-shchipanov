import { getRandomPositiveInteger, getRandomPositiveFloat } from './utils.js';
import { avatarsImg } from './avatar.js';
import constants from '../constants.js';
import { title, types, checking, checkouts, description, features, photos } from './data.js';
import { getNewArrayItems } from './form.js';

const generateAdvertisement = () => {
  const randomIndex = getRandomPositiveInteger(0, avatarsImg.length - 1);
  const [avatar] = avatarsImg.splice(randomIndex, 1);
  const author = {
    avatar,
  };

  const location = {
    lat: getRandomPositiveFloat(35.65, 35.7, 5),
    lng: getRandomPositiveFloat(139.7, 139.8, 5),
  };

  const offer = {
    title: title,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveFloat(constants.MIN_PRICE, constants.MAX_PRICE, 0),
    type: types[getRandomPositiveInteger(0, types.length - 1)],
    rooms: getRandomPositiveFloat(constants.MIN_ROOMS, constants.MAX_ROOMS, 0),
    guests: getRandomPositiveFloat(
      constants.FOREVER_ALONE,
      constants.MAX_GUESTS,
      0
    ),
    checked: checking[getRandomPositiveInteger(0, checking.length - 1)],
    checkout: checkouts[getRandomPositiveInteger(0, checkouts.length - 1)],
    features: getNewArrayItems(features),
    description: description,
    photos: getNewArrayItems(photos),
  };

  return {
    author,
    offer,
    location
  };
};

const similarAdvertisement = () => Array.from(
  {
    length: constants.LIMITED_NUMBER_ADVERTISEMENT,
  },
  generateAdvertisement
);


export { similarAdvertisement};

