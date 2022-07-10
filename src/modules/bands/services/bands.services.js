import axios from "axios";

axios.interceptors.response.use((response) => {
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

export const getBands = async (limit = 5, offset = 0) => {
  return await axios.get('http://localhost:3003/v1/bands', {
    params: {
      limit,
      offset
    }
  });
};

export const getBand = async (id) => {
  try {
    return await axios.get(`http://localhost:3003/v1/bands/${id}`);
  } catch (err) {
    if (err.code === 'ERR_BAD_RESPONSE') {
      return new Error("Band's id is wrong", "ERR_BAD_RESPONSE");
    }
  }
};

export const createBand = async (input, token) => {
  return await axios.post('http://localhost:3003/v1/bands', input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateBand = async (id, input, token) => {
  return await axios.put(`http://localhost:3003/v1/bands/${id}`, input, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteBand = async (id, token) => {
  return await axios.delete(`http://localhost:3003/v1/bands/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
