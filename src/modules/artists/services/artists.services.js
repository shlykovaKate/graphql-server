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

export const getArtists = async (limit = 5, offset = 0) => {
  return await axios.get('http://localhost:3002/v1/artists', {
    params: {
      limit,
      offset
    }
  });
};

export const getArtist = async (id) => {
  try {
    return await axios.get(`http://localhost:3002/v1/artists/${id}`);
  } catch (err) {
    if (err.code === 'ERR_BAD_RESPONSE') {
      return new Error("Artist's id is wrong", "ERR_BAD_RESPONSE");
    }
  }
};

export const createArtist = async (input, token) => {
  return await axios.post('http://localhost:3002/v1/artists', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateArtist = async (id, input, token) => {
  return await axios.put(`http://localhost:3002/v1/artists/${id}`, input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteArtist = (id, token) => {
  return axios.delete(`http://localhost:3002/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
