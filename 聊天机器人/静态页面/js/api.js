const API =
  (function () {
    async function reg(userInfo) {
      const resp = await Utils.post('/api/user/reg', userInfo);
      return await resp.json();
    }


    async function logIn(loginInfo) {
      const resp = await Utils.post('/api/user/login', loginInfo);
      const result = await resp.json();
      if (result.code === 0) {
        const token = resp.headers.get(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
      }
      return result;
    }


    async function profile() {
      const resp = await Utils.get('/api/user/profile');
      return await resp.json();
    }


    async function exists(loginId) {
      const resp = await Utils.get('/api/user/exists?loginId=' + loginId);
      return await resp.json();
    }


    const sendMessage = content =>
      Utils.post('/api/chat', { content })
        .then(resp => resp.json());


    const getHistory = () => Utils.get('/api/chat/history')
      .then(resp => resp.json());

    const loginOut = () => localStorage.removeItem(TOKEN_KEY);

    return {
      reg,
      logIn,
      profile,
      exists,
      sendMessage,
      getHistory,
      loginOut,
    }
  })()