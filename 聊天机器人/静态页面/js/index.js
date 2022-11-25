(async function () {
  const login = await API.profile();
  const user = login.data;
  if (!user) {
    alert('您还没有登录,请先登录');
    location.href = './login.html';
    return;
  }

  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId')
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    button: $('.msg-container button'),
    messageConatiner: $('.msg-container'),
  }

  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }



  doms.close.onclick = function () {
    API.loginOut();
    location.href = './login.html';
  }


  function addChat(chatInfo) {
    const div = $$$('div');
    div.classList.add('chat-item');
    if (chatInfo.from)
      div.classList.add('me');
    const img = $$$('img');
    img.className = 'chat-avatar';
    img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

    const content = $$$('div');
    content.className = 'chat-content';
    content.innerText = chatInfo.content;

    const date = $$$('div');
    date.className = 'chat-date';
    date.innerText = formateDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div);
  }

  function formateDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  // 加载历史记录
  async function setHistory() {
    const history = await API.getHistory();
    history.data.forEach(i => addChat(i));
    scrollToBottom();
  }

  // 滚动聊天滚动条到底部
  function scrollToBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  function init() {
    setUserInfo();
    setHistory();
  }

  init();

  async function sendChat() {
    const message = doms.txtMsg.value.trim();
    console.log(message);
    if (!message) return;
    addChat({
      content: message,
      from: user.loginId,
      to: null,
      createdAt: Date.now()
    });
    doms.txtMsg.value = "";
    scrollToBottom();
    const answer = await API.sendMessage(message);
    addChat({
      from: null,
      to: user.loginId,
      ...answer.data,
    });
    scrollToBottom();
  }


  doms.messageConatiner.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  }
}
)()