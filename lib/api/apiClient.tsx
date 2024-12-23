import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
});

export default apiClient;
