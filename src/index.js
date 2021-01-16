import './styles.css';
import {
  signUp,
  login,
  logout,
  addContact,
  getContacts,
  deleteContact,
  updateContact,
} from './js/api';
import refs from './js/refs';
import toggleClassList from './js/toggle-classlist';

let allContacts = [];

function render() {
  const contacts = allContacts
    .map(contact => {
      return `<li>
    <span class="contact-name-${contact.id}">${contact.name}</span>: <span class="contact-number-${contact.id}">${contact.number}</span>
    <button class="delete" data-id=${contact.id}>Delete</button>
    <button class="add" data-id=${contact.id}>Update</button>
    <div class="update-form-wrapper" data-id=${contact.id}></div> 
    </li> `;
    })
    .join('');

  refs.contactList.innerHTML = '';
  refs.contactList.insertAdjacentHTML('beforeend', contacts);

  const btnsDelete = refs.contactList.querySelectorAll('.delete');
  const btnsAdd = refs.contactList.querySelectorAll('.add');
  const formsUpdate = refs.contactList.querySelectorAll('.update-form-wrapper');

  btnsDelete.forEach(btnDelete =>
    btnDelete.addEventListener('click', deleteContactHandler),
  );

  btnsAdd.forEach(btnAdd => {
    btnAdd.addEventListener('click', event => {
      btnAdd.classList.add('is-hidden');
      // console.dir(event.target);
      const contactForAddId = event.target.dataset.id;
      const markupUpdateForm = `
        <input type="text" class="update-name" />
        <input type="text" class="update-number" />
        <button class="save">Save</button>
      `;

      const selectedContact = allContacts.find(
        contact => contact.id === contactForAddId,
      );

      console.log('selectedContact', selectedContact);
      // console.log('formsUpdate', formsUpdate);

      formsUpdate.forEach(formUpdate => {
        // console.log(formUpdate.dataset.id);

        if (formUpdate.dataset.id === contactForAddId) {
          const selectedFormUpdate = formUpdate;
          // console.log('formUpdate', formUpdate);

          selectedFormUpdate.insertAdjacentHTML('beforeend', markupUpdateForm);

          const updateName = formUpdate.querySelector('.update-name');
          const updateNumber = formUpdate.querySelector('.update-number');
          const contactName = refs.contactList.querySelector(
            `.contact-name-${contactForAddId}`,
          );
          const contactNumber = refs.contactList.querySelector(
            `.contact-number-${contactForAddId}`,
          );
          const btnSave = formUpdate.querySelector('.save');
          // console.log('contactName', contactName);
          // console.log('contactNumber', contactNumber);

          const fields = {};

          updateName.addEventListener('input', event => {
            const newName = updateName.value;
            // console.log(newName);
            contactName.textContent = newName;
            fields.name = contactName.textContent;
          });
          updateNumber.addEventListener('input', event => {
            const newNumber = updateNumber.value;
            // console.log(newNumber);
            contactNumber.textContent = newNumber;
            fields.number = contactNumber.textContent;
          });

          btnSave.addEventListener('click', () => {
            // console.log('fields', fields);

            updateContact(contactForAddId, fields)
              .then(contact => (contact = { ...selectedContact, contact }))
              .then(getContacts)
              .then(data => (allContacts = data))
              .then(render)
              .catch(error => console.log(error));
          });
        }
      });
    });
  });
}

refs.btnSignUp.addEventListener('click', () => {
  toggleClassList.onClickBtnSignup();

  refs.formSignUp.addEventListener('submit', signupHandler);
});

refs.btnLogin.addEventListener('click', () => {
  toggleClassList.onClickBtnLogin();

  refs.formSignUp.addEventListener('submit', loginHandler);
});

refs.btnLogout.addEventListener('click', logOutHandler);

refs.contactForm.addEventListener('submit', contactFormHandler);

/* ==================== CRUD ==================== */
function signupHandler(event) {
  event.preventDefault();

  const nameSignup = event.target.elements.name_signup.value;
  const emailSignup = event.target.elements.email_signup.value;
  const pswSignup = event.target.elements.psw_signup.value;

  const userDataSignup = {
    name: nameSignup,
    email: emailSignup,
    password: pswSignup,
  };

  signUp(userDataSignup)
    .then(({ user }) => {
      refs.name.textContent = user.name;
      refs.email.textContent = user.email;

      refs.formSignUp.classList.add('is-hidden');
      refs.content.classList.remove('is-hidden');

      refs.formSignUp.reset();
    })
    .then(loginFunc(userDataSignup))
    .catch(error => console.log(error));
}

function loginHandler(event) {
  event.preventDefault();

  const emailLogin = event.target.elements.email_signup.value;
  const pswLogin = event.target.elements.psw_signup.value;

  const userDataLogin = {
    email: emailLogin,
    password: pswLogin,
  };

  loginFunc(userDataLogin);
}

function loginFunc(userDataLogin) {
  login(userDataLogin)
    .then(({ user }) => {
      refs.name.textContent = user.name;
      refs.email.textContent = user.email;

      refs.formSignUp.classList.add('is-hidden');
      refs.content.classList.remove('is-hidden');

      refs.formSignUp.reset();
    })
    .then(getContacts)
    .then(data => (allContacts = data))
    .then(render)
    .catch(error => console.log(error));
}

function logOutHandler() {
  logout()
    .then(data => {
      if (data.message === 'Please authenticate') {
        alert('Пожалуйста, войдите или зарегестрируйтесь');
      }
      // console.log(data);

      refs.name.textContent = '';
      refs.email.textContent = '';
      refs.contactList.innerHTML = '';

      toggleClassList.onClickBtnLogout();

      refs.formSignUp.removeEventListener('submit', signupHandler);
      refs.formSignUp.removeEventListener('submit', loginHandler);
      // refs.formSignUp.reset();
    })
    .catch(error => console.log(error));
}

function contactFormHandler(event) {
  event.preventDefault();

  let name = event.target.elements.name.value;
  let number = event.target.elements.number.value;

  const newContact = { name, number };

  addContact(newContact)
    .then(contact => allContacts.push(contact))
    .then(render)
    .then(() => {
      refs.contactForm.reset();
    })
    .catch(error => console.log(error));
}

function deleteContactHandler(event) {
  const contactForDeleteId = event.target.dataset.id;

  deleteContact(contactForDeleteId)
    .then(
      () =>
        (allContacts = allContacts.filter(
          contact => contact.id !== contactForDeleteId,
        )),
    )
    .then(render)
    .catch(error => console.log(error));
}
