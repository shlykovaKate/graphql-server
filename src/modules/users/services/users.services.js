import axios from "axios";

axios.interceptors.response.use(function (response) {
  if (!response.data) {
    response.data = null;
    return response;
  }
  if (response.data.items) {
    response.data.items = response.data.items.map((item) => ({ ...item, id: item._id }));
  } else {
    response.data = { ...response.data, id: response.data._id };
  }
  return response;
});

export const registerUser = async (firstName, lastName, email, password) => {
  return await axios.post('http://localhost:3004/v1/users/register', {
    firstName,
    lastName,
    email,
    password
  });
};

export const getJWT = async (email, password) => {
  return await axios.post('http://localhost:3004/v1/users/login', {
    email,
    password
  });
}

export const getUser = async (id) => {
  return await axios.get(`http://localhost:3004/v1/users/${id}`);
};
