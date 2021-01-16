import axios from 'axios';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';
const setToken = token => {
  axios.defaults.headers.common['Authorization'] = token;
};

/* ==================== async/await ==================== */
export const signUp = async userData => {
  try {
    const response = await axios.post('/users/signup', userData);
    const data = await response.data;
    setToken(data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async userData => {
  try {
    const response = await axios.post('/users/login', userData);
    const data = await response.data;
    setToken(data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('/users/logout');

    return response;
  } catch (error) {
    throw error;
  }
};

export const addContact = async payload => {
  try {
    const response = await axios.post('/contacts', payload);
    const data = await response.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const getContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    const data = await response.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async id => {
  try {
    const response = await axios.delete(`/contacts/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateContact = async (id, fields) => {
  try {
    const response = await axios.patch(`/contacts/${id}`, fields);
    const data = await response.data;

    return data;
  } catch (error) {
    throw error;
  }
};

/* ==================== axios ==================== */
// export const signUp = userData =>
//   axios.post('/users/signup', userData).then(({ data }) => {
//     setToken(data.token);

//     return data;
//   });

// export const login = userData =>
//   axios.post('/users/login', userData).then(({ data }) => {
//     setToken(data.token);

//     return data;
//   });

// export const logout = () => axios.post('/users/logout');

// export const addContact = payload =>
//   axios.post('/contacts', payload).then(({ data }) => data);

// export const getContacts = () =>
//   axios.get('/contacts').then(({ data }) => data);

// export const deleteContact = id => axios.delete(`/contacts/${id}`);

// export const updateContact = (id, fields) =>
//   axios.patch(`/contacts/${id}`, fields).then(({ data }) => data);

/* ==================== CRUD ==================== */
// let token = '';
// const setToken = loadedToken => (token = loadedToken);

// const baseUrl = 'https://goit-phonebook-api.herokuapp.com';

// export const signUp = userData =>
//   fetch(`${baseUrl}/users/signup`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   })
//     .then(res => res.json())
//     .then(data => {
//       setToken(data.token);

//       return data;
//     });

// export const login = userData =>
//   fetch(`${baseUrl}/users/login`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   })
//     .then(res => res.json())
//     .then(data => {
//       setToken(data.token);

//       return data;
//     });

// export const logout = () =>
//   fetch(`${baseUrl}/users/logout`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//   }).then(res => res.json());

// export const addContact = ({ name, number }) =>
//   fetch(`${baseUrl}/contacts`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//     body: JSON.stringify({ name, number }),
//   }).then(res => res.json());

// export const getContacts = () =>
//   fetch(`${baseUrl}/contacts`, {
//     headers: {
//       Authorization: token,
//     },
//   }).then(res => res.json());

// export const deleteContact = id =>
//   fetch(`${baseUrl}/contacts/${id}`, {
//     method: 'delete',
//     headers: {
//       Authorization: token,
//     },
//   }).then(res => res.json());

// export const updateContact = (id, fields) =>
//   fetch(`${baseUrl}/contacts/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//       Authorization: token,
//     },
//     body: JSON.stringify(fields),
//   })
//     .then(res => res.json())
//     .then(console.log)
//     .catch(error => console.log('error ', error));
