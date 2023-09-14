import constants from '../constants.js';

export const avatarsImg = Array.from(
  {
    length: constants.MAX_AVATAR,
  },
  (item, index) => {
    const userNumber = index + 1;
    const userNumberString = userNumber < 10 ? `0${userNumber}` : userNumber;
    return `img/avatars/user${userNumberString}.png`;
  }
);
