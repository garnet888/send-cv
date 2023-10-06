require("dotenv").config();

const express = require("express");
const cors = require("cors");

const adminRoute = require("./src/routes/adminRoute");
const authRoute = require("./src/routes/authRoute");

const usersRoute = require("./src/routes/usersRoute");
const planJobRoute = require("./src/routes/planJobRoute");

const cvEduRoute = require("./src/routes/cvEduRoute");
const cvJobHisRoute = require("./src/routes/cvJobHisRoute");
const cvJobSkillRoute = require("./src/routes/cvJobSkillRoute");
const cvSubSkillRoute = require("./src/routes/cvSubSkillRoute");

const jobsRoute = require("./src/routes/jobsRoute");
const sentCVsRoute = require("./src/routes/sentCVsRoute");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 80;
const FRONTEND = process.env.FRONTEND;

app.use(
  cors({
    origin: [FRONTEND, "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);

app.use("/api/users", usersRoute);
app.use("/api/plan-job", planJobRoute);

app.use("/api/cv-edu", cvEduRoute);
app.use("/api/cv-job-his", cvJobHisRoute);
app.use("/api/cv-job-skill", cvJobSkillRoute);
app.use("/api/cv-sub-skill", cvSubSkillRoute);

app.use("/api/jobs", jobsRoute);
app.use("/api/sent-cv", sentCVsRoute);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
