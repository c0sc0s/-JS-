const idValidator = new FieldValidator('txtLoginId', async function (val) {
  if (!val) return '请填写账号';
  const result = await API.exists(val);
  if (result.data) {
    return '该账号已经被占用,请重新选择一个账号名'
  }
})

const nicknameValidator = new FieldValidator('txtNickname', async function (val) {
  if (!val) return '请填写昵称';
});

const pwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
  if (!val) return '请填写密码';
});

const pwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', async function (val) {
  const pwd = $('#txtLoginPwd');
  if (!val) return '请填写确认密码';
  if (val != pwd.value) {
    return '密码不一致'
  }
});

const form = $('.user-form');

form.onsubmit = async function (e) {
  e.preventDefault();
  const res = await FieldValidator.validate(idValidator, nicknameValidator, pwdValidator, pwdConfirmValidator);
  if (!res) return;
  const formdata = new FormData(form).entries();
  const resp = await API.reg(Object.fromEntries(formdata))
  if (resp.code === 0) {
    alert('注册成功');
    location.href = './login.html';
  }
}