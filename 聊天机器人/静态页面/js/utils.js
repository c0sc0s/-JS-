const Utils =
  (function () {
    function get(path) {
      const headers = {};
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }
      return fetch(BASE_URL + path, { headers });
    }

    function post(path, body) {
      const headers = {
        'Content-Type': 'application/json'
      };
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }
      return fetch(BASE_URL + path, { method: 'POST', headers, body: JSON.stringify(body) });
    }
    return {
      get,
      post
    };
  })();