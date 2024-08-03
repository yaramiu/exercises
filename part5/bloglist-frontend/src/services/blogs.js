import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getConfig = () => {
  return {
    headers: {
      Authorization: token,
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = getConfig();
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const config = getConfig();
  const { id, ...blogRequestData } = blog;
  const response = await axios.put(`${baseUrl}/${id}`, blogRequestData, config);
  return response.data;
};

const remove = async (blogId) => {
  const config = getConfig();
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, setToken, create, update, remove };
