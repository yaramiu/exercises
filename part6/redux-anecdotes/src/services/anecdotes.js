import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (id) => {
  const objectToUpdate = await get(id);
  const updatedObject = {
    ...objectToUpdate,
    votes: objectToUpdate.votes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, updatedObject);
};

export default { getAll, create, update };
