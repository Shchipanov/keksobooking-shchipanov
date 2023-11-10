const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Произошла ошибка при загрузке. Попробуйте ещё раз.');
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
        onFail('Форма не отправлена. Попробуйте еще раз.');
      }
    })
    .catch(() => {
      onFail('Форма не отправлена. Попробуйте еще раз.');
    });
};

export { getData, sendData };
