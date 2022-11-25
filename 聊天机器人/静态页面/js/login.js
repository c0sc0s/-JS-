const idValidator = new FieldValidator('txtLoginId', async function (val) {
  if (!val) return '请填写账号';
})



const pwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
  if (!val) return '请填写密码';
});



const form = $('.user-form');

form.onsubmit = async function (e) {
  e.preventDefault();
  const res = await FieldValidator.validate(idValidator, pwdValidator);
  if (!res) return;
  const formdata = new FormData(form).entries();
  const resp = await API.logIn(Object.fromEntries(formdata))
  if (resp.code === 0) {
    alert('登录成功');
    location.href = './index.html';
  } else {
    idValidator.p.innerText = '账号或密码错误';
    pwdValidator.input.value = '';
  }
}