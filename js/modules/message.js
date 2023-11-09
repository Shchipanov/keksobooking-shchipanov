import constants from '../constants.js';

// Если при отправке данных произошла ошибка запроса,
// показывается соответствующее сообщение. Разметку сообщения,
// которая находится в блоке #error в шаблоне template, нужно
// разместить перед закрывающим тегом </body>.
// Сообщение должно исчезать после нажатия на кнопку
// .error__button, по нажатию на клавишу Esc и
// по клику на произвольную область экрана.
// В таком случае вся введённая пользователем информация
// сохраняется, чтобы у него была возможность отправить форму повторно.

const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

/**Создает сообщение об успешно отправленной форме */
const displayMessageSuccess = () => {
  const successMessageElement = successTemplate.cloneNode(true);
  document.appendChild(successMessageElement);

  setTimeout(() => {
    successMessageElement.remove();
  }, constants.MESSAGE_TIME);
};

/**Создает сообщение об ошибке при отправке формы */
const displayMessageError = (error) => {
  const errorMessageElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessageElement);

  const errorText = document.querySelector('.error__message');
  errorText.textContent = error;

  const closeError = () => {
    errorMessageElement.remove();
    // document.removeEventListener('keydown', eventOnEsc);
  };

  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.addEventListener('click', closeError);

  const eventOnEsc = (evt) => {
    if (evt.keyCode === 27) {
      closeError();
    }
  };
  document.addEventListener('keydown', eventOnEsc);

  const eventOnClick = () => {
    closeError();
  };
  document.addEventListener('click', eventOnClick);
};

export { displayMessageError, displayMessageSuccess };
