const CVJobHisTable = require("../tables/cvJobHisTable");

const addHistory = async (req, res) => {
  try {
    const DATA = {
      userID: req.params.userID,
      ...req.body,
    };

    const result = await CVJobHisTable.insert(DATA);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editHistory = async (req, res) => {
  try {
    const result = await CVJobHisTable.update(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const edu = await CVJobHisTable.getByUserID({ userID });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;

    const edu = await CVJobHisTable.getByID({ id });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await CVJobHisTable.delete({ id });
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addHistory,
  editHistory,
  getByUserID,
  getByID,
  deleteHistory,
};
