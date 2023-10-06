import axios from "axios";

export default axios.create({
  baseURL: "https://send-cv-backend.vercel.app/api",
});
