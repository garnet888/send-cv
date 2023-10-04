const JobsTable = require("../tables/jobsTable");

const jobTypes = async (req, res) => {
  try {
    const types = await JobsTable.getJobTypes();

    res.status(200).json(types);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const wkTimeTypes = async (req, res) => {
  try {
    const types = await JobsTable.getWKTimeTypes();

    res.status(200).json(types);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  jobTypes,
  wkTimeTypes,
};
