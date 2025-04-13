import instance from "axios";

const axios = instance.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
