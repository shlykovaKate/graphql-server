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

export const getGenres = async (limit = 5, offset = 0) => {
  return await axios.get('http://localhost:3001/v1/genres', {
    params: {
      limit,
      offset
    }
  });
};

export const getGenre = async (id) => {
  try {
    return await axios.get(`http://localhost:3001/v1/genres/${id}`);
  } catch (err) {
    if (err.code === 'ERR_BAD_RESPONSE') {
      return new Error("Genre's id is wrong", "ERR_BAD_RESPONSE");
    }
  }
};

export const createGenre = async (input, token) => {
  return await axios.post('http://localhost:3001/v1/genres', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateGenre = async (id, input, token) => {
  return await axios.put(`http://localhost:3001/v1/genres/${id}`, input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteGenre = (id, token) => {
  return axios.delete(`http://localhost:3001/v1/genres/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
