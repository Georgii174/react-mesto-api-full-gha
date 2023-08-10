export const BASE_URL = `https://api.mesto.georgii.pr15.nomoreparties.co`
// export const BASE_URL = `localhost:3000`

export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ой...: ${res.status}`);
  }