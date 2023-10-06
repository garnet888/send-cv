import axios from "axios";

export default axios.create({
  baseURL:
    process.env.DEV_TYPE === "production"
      ? "https://send-cv-backend.vercel.app/api"
      : "http://localhost:5000/api",
});
