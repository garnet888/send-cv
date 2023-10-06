const { authAccount } = require("../authHelper");
const JobsTable = require("../tables/jobsTable");

const jobTypes = async (req, res) => {
  try {
    const types = await JobsTable.getJobTypes();
    res.status(200).json(types);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const wkTimeTypes = async (req, res) => {
  try {
    const types = await JobsTable.getWKTimeTypes();
    res.status(200).json(types);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getList = async (req, res) => {
  try {
    const jobs = await JobsTable.getAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getSortingList = async (req, res) => {
  try {
    const jobs = await JobsTable.getSorting(req.body);
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await JobsTable.getByID({ id });
    res.status(200).json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const addJob = async (req, res) => {
  try {
    const { isAuthed, status, message } = await authAccount(
      req.headers.token,
      "ADMIN"
    );

    if (isAuthed) {
      const result = await JobsTable.insert(req.body);
      res.status(200).json(result);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editJob = async (req, res) => {
  try {
    const { isAuthed, status, message } = await authAccount(
      req.headers.token,
      "ADMIN"
    );

    if (isAuthed) {
      const result = await JobsTable.update(req.body);
      res.status(200).json(result);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { isAuthed, status, message } = await authAccount(
      req.headers.token,
      "ADMIN"
    );

    if (isAuthed) {
      const { id } = req.params;

      const result = await JobsTable.delete({ id });
      res.status(200).json(result);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  jobTypes,
  wkTimeTypes,
  getList,
  getSortingList,
  getByID,
  addJob,
  editJob,
  deleteJob,
};
