import axios from "axios";

export default axios.create({
  baseURL: process.env.AXIOS_URL || "http://localhost:5000/api",
});
