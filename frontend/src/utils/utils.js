export const BASE_URL = `https://mesto.ageorgii74.ru.nomoredomains.xyz`
// export const BASE_URL = `http://localhost:3001`

export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ой...: ${res.status}`);
  }