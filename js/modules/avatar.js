const getAvatarNumber = (item, index) => {
  const userNumber = index + 1;
  const userNumberString = userNumber < 10 ? `0${userNumber}` : userNumber;
  return `img/avatars/user${userNumberString}.png`;
};

export const avatarsImg = Array.from(
  {
    length: 10,
  },
  getAvatarNumber
);

