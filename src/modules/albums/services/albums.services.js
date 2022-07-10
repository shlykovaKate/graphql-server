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

export const getAlbums = async (limit = 5, offset = 0) => {
  return await axios.get('http://localhost:3005/v1/albums', {
    params: {
      limit,
      offset
    }
  });  
};

export const getAlbum = async (id) => {
  try {
    return await axios.get(`http://localhost:3005/v1/albums/${id}`);
  } catch (err) {
    if (err.code === 'ERR_BAD_RESPONSE') {
      return new Error("Album's id is wrong", "ERR_BAD_RESPONSE");
    }
  }
};

export const createAlbum = async (input, token) => {
  return await axios.post('http://localhost:3005/v1/albums', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateAlbum = async (id, input, token) => {
  return await axios.put(`http://localhost:3005/v1/albums/${id}`, input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteAlbum = (id, token) => {
  return axios.delete(`http://localhost:3005/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
