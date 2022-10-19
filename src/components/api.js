export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  changeUserData(nameUser, aboutUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameUser}`,
        about: `${aboutUser}`
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  addNewCard(nameImage, linkImage) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameImage}`,
        link: `${linkImage}`
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  addLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  updateAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}
