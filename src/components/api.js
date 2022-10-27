export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInformation() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._headers.authorization
      }
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._headers.authorization
      }
    });
  }

  changeUserData(nameUser, aboutUser) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameUser}`,
        about: `${aboutUser}`
      })
    });
  }

  addNewCard(nameImage, linkImage) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameImage}`,
        link: `${linkImage}`
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    });
  }

  addLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization
      }
    });
  }

  deleteLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    });
  }

  updateAvatar(avatarLink) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
}
