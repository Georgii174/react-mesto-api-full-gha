import checkResponse from './utils';
import { BASE_URL } from './utils';


class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _fetch(path, method, data) {
    let body = data;
    if ((method === 'PATCH' || method === 'POST') && data) {
      body = JSON.stringify(data);
    }

    const res = await fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    });
    return checkResponse(res);
  }

  getUserInfo() {
    return this._fetch('/users/me', 'GET');
  }

  setUserInfo(data) {
    return this._fetch('/users/me', 'PATCH', data);
  }

  addCard(data) {
    return this._fetch('/cards', 'POST', data);
  }

  getInitialCards() {
    return this._fetch('/cards', 'GET');
  }

  likeCard(id) {
    return this._fetch(`/cards/likes/${id}`, 'PUT');
  }

  dislikeCard(id) {
    return this._fetch(`/cards/likes/${id}`, 'DELETE');
  }

  changeLikeCardStatus(id, hasLike) {
    if (!hasLike) {
      return api.likeCard(id);
    }
    return api.dislikeCard(id);
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, 'DELETE');
  }

  setUserAvatar(data) {
    return this._fetch(`/users/me/avatar`, 'PATCH', data);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  }
});
