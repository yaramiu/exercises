import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseURL, newObject);
  return response.data;
};

const personService = { getAll, create };

export default personService;
