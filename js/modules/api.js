const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Ошибка при загрузке.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body,
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
