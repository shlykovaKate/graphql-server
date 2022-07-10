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

export const getFavourites = async (token) => {
  return await axios.get('http://localhost:3007/v1/favourites', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const addToFavourites = async (input, token) => {
  return await axios.put('http://localhost:3007/v1/favourites/add', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const removeToFavourites = async (input, token) => {
  return await axios.put('http://localhost:3007/v1/favourites/remove', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
