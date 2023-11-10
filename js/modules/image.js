import constants from '../constants.js';

const avatarImageChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document
  .querySelector('.ad-form-header__preview')
  .querySelector('img');
const houseImageChooserElement = document.querySelector('.ad-form__input');
const houseImagePreviewElement = document.querySelector('.ad-form__photo');

const setImageAvatar = () => {
  avatarImageChooserElement.addEventListener('change', () => {
    const file = avatarImageChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = constants.FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreviewElement.src = URL.createObjectURL(file);
    }
  });
};

const setImageHouse = () => {
  houseImageChooserElement.addEventListener('change', () => {
    const file = houseImageChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = constants.FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      houseImagePreviewElement.innerHTML = '';
      const imageElement = document.createElement('img');
      imageElement.src = URL.createObjectURL(file);
      imageElement.setAttribute('height', '70px');
      imageElement.setAttribute('width', '70px');
      imageElement.style = 'object-fit: cover;';
      houseImagePreviewElement.appendChild(imageElement);
    }
  });
};

export { setImageHouse, setImageAvatar };
