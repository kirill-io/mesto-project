const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '901b5f54-a3c1-49a6-b698-d1aa30508c91',
    'Content-Type': 'application/json'
  }
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse);
};

export const changeUserData = (nameUser, aboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: `${nameUser}`,
      about: `${aboutUser}`
    })
  })
  .then(checkResponse);
};

export const addNewCard = (nameImage, linkImage) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: `${nameImage}`,
      link: `${linkImage}`
    })
  })
  .then(checkResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse);
};

export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse);
};

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse);
};

export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(checkResponse);
};
