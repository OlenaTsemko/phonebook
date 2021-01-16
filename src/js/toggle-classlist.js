import refs from './refs';

const toggleClassList = {
  inputName: refs.formSignUp.querySelector('.input-name-signup'),
  btnFormSignup: refs.formSignUp.querySelector('.btn-form-signup'),
  btnFormLogin: refs.formSignUp.querySelector('.btn-form-login'),

  onClickBtnSignup() {
    this.inputName.classList.remove('is-hidden');
    this.btnFormSignup.classList.remove('is-hidden');

    refs.formSignUp.classList.remove('is-hidden');
    refs.btnSignUp.classList.add('is-hidden');
    refs.btnLogin.classList.add('is-hidden');
  },

  onClickBtnLogin() {
    this.btnFormLogin.classList.remove('is-hidden');

    refs.formSignUp.classList.remove('is-hidden');
    refs.btnSignUp.classList.add('is-hidden');
    refs.btnLogin.classList.add('is-hidden');
  },

  onClickBtnLogout() {
    this.inputName.classList.add('is-hidden');
    this.btnFormSignup.classList.add('is-hidden');
    this.btnFormLogin.classList.add('is-hidden');
    refs.content.classList.add('is-hidden');
    refs.formSignUp.classList.add('is-hidden');
    refs.btnSignUp.classList.remove('is-hidden');
    refs.btnLogin.classList.remove('is-hidden');
  },
};

export default toggleClassList;
