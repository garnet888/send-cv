require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usersRoute = require("./routes/usersRoute");
const jobsRoute = require("./routes/jobsRoute");

const app = express();

const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;

app.use(
  cors({
    origin: [FRONTEND, "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/users", usersRoute);
app.use("/api/jobs", jobsRoute);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
