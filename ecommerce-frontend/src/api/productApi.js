import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getProducts = async (token) => {
  const response = await axios.get(`${BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};