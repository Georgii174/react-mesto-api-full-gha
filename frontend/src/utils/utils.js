export const BASE_URL = `https://mesto.georgii.nomoreparties.co`

export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ой...: ${res.status}`);
  }