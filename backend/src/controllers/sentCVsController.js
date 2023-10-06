const SentCVsTable = require("../tables/sentCVsTable");

const checkSent = async (req, res) => {
  try {
    const { userID, jobID } = req.params;

    const cv = await SentCVsTable.getByUserJobID({ userID, jobID });

    if (cv) {
      res.status(200).json({ value: true });
    } else {
      res.status(200).json({ value: false });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const sendCV = async (req, res) => {
  try {
    const cv = await SentCVsTable.getByUserJobID(req.body);

    if (cv) {
      res.status(409).json({
        message: "Анкет илгээгдсэн байна!",
      });
    } else {
      const result = await SentCVsTable.insert(req.body);
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllCVs = async (req, res) => {
  try {
    const cvs = await SentCVsTable.getAll();
    res.status(200).json(cvs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const cvs = await SentCVsTable.getByUserID({ userID });
    res.status(200).json(cvs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByJobID = async (req, res) => {
  try {
    const { jobID } = req.params;

    const cvs = await SentCVsTable.getByJobID({ jobID });
    res.status(200).json(cvs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await SentCVsTable.getByID({ id });
    res.status(200).json(cv);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await SentCVsTable.delete({ id });
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkSent,
  sendCV,
  getAllCVs,
  getByUserID,
  getByJobID,
  getByID,
  deleteCV,
};
