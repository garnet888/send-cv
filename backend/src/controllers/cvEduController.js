const CVEduTable = require("../tables/cvEduTable");

const getLevels = async (req, res) => {
  try {
    const levels = await CVEduTable.getLevels();
    res.status(200).json(levels);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const addEducation = async (req, res) => {
  try {
    const DATA = {
      userID: req.params.userID,
      ...req.body,
    };

    const result = await CVEduTable.insert(DATA);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editEducation = async (req, res) => {
  try {
    const result = await CVEduTable.update(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const edu = await CVEduTable.getByUserID({ userID });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;

    const edu = await CVEduTable.getByID({ id });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await CVEduTable.delete({ id });
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLevels,
  addEducation,
  editEducation,
  getByUserID,
  getByID,
  deleteEducation,
};
