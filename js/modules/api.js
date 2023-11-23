import constants from '../constants.js';

const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(constants.ERROR_MAP_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(constants.ERROR_MESSAGE);
        //onFail();
      }
    })
    .catch(() => {
      onFail(constants.ERROR_MESSAGE);
      //onFail();
    });
};

export { getData, sendData };
