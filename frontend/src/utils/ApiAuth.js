class ApiAuth {
  constructor ({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ой...: ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      headers:  {...this.headers, Authorization: `Bearer ${token}`},
    });
  }

  signup({ email, password}) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  signin({ email, password}) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

}

export const apiAuth = new ApiAuth({
  baseUrl: `https://auth.nomoreparties.co`,
  headers: {
    'Content-Type': 'application/json'
  },
});
