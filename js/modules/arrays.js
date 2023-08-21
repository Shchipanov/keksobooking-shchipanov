import { getRandomPositiveInteger } from './get_function.js';

const getAvatarNumber = (item, index) => {
  const userNumber = index + 1;
  const userNumberString = userNumber < 10 ? `0${userNumber}` : userNumber;
  return `img/avatars/user${userNumberString}.png`;
};

const avatarsImg = Array.from(
  {
    length: 10,
  },
  getAvatarNumber
);


const generateAdvertisement = () => {
  const randomIndex = getRandomPositiveInteger(0, avatarsImg.length - 1);
  const [avatar] = avatarsImg.splice(randomIndex, 1);
  const author = {
    avatar,
  };
  return author;
};

const similarAdvertisement = Array.from(
  {
    length: 10,
  },
  generateAdvertisement
);


export { similarAdvertisement};

