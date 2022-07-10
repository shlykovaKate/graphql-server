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

export const getTracks = async (limit = 5, offset = 0) => {
  return await axios.get('http://localhost:3006/v1/tracks', {
    params: {
      limit,
      offset
    }
  });
};

export const getTrack = async (id) => {
  try {
    return await axios.get(`http://localhost:3006/v1/tracks/${id}`);
  } catch (err) {
    if (err.code === 'ERR_BAD_RESPONSE') {
      return new Error("Track's id is wrong", "ERR_BAD_RESPONSE");
    }
  }
};

export const createTrack = async (input, token) => {
  return await axios.post('http://localhost:3006/v1/tracks', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateTrack = async (id, input, token) => {
  return await axios.put(`http://localhost:3006/v1/tracks/${id}`, input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteTrack = (id, token) => {
  return axios.delete(`http://localhost:3006/v1/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
