const CVJobSkillTable = require("../tables/cvJobSkillTable");

const addJobSkill = async (req, res) => {
  try {
    const DATA = {
      userID: req.params.userID,
      ...req.body,
    };

    const result = await CVJobSkillTable.insert(DATA);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editJobSkill = async (req, res) => {
  try {
    const result = await CVJobSkillTable.update(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const edu = await CVJobSkillTable.getByUserID({ userID });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;

    const edu = await CVJobSkillTable.getByID({ id });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteJobSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await CVJobSkillTable.delete({ id });
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addJobSkill,
  editJobSkill,
  getByUserID,
  getByID,
  deleteJobSkill,
};
