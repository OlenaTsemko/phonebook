let token = '';
const setToken = loadedToken => (token = loadedToken);

const baseUrl = 'https://goit-phonebook-api.herokuapp.com';

export const signUp = userData =>
  fetch(`${baseUrl}/users/signup`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    .then(data => {
      setToken(token);

      return data;
    });

export const login = userData =>
  fetch(`${baseUrl}/users/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    .then(data => {
      setToken(data.token);

      return data;
    });

export const logout = () =>
  fetch(`${baseUrl}/users/logout`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then(res => res.json());

export const addContact = ({ name, number }) =>
  fetch(`${baseUrl}/contacts`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ name, number }),
  }).then(res => res.json());

export const getContacts = () =>
  fetch(`${baseUrl}/contacts`, {
    headers: {
      Authorization: token,
    },
  }).then(res => res.json());

export const deleteContact = id =>
  fetch(`${baseUrl}/contacts/${id}`, {
    method: 'delete',
    headers: {
      Authorization: token,
    },
  }).then(res => res.json());

export const updateContact = (id, fields) =>
  fetch(`${baseUrl}/contacts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token,
    },
    body: JSON.stringify(fields),
  })
    .then(res => res.json())
    .then(console.log)
    .catch(error => console.log('error ', error));
