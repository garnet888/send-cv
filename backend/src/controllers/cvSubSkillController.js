const CVSubSkillTable = require("../tables/cvSubSkillTable");

const addSubSkill = async (req, res) => {
  try {
    const DATA = {
      userID: req.params.userID,
      ...req.body,
    };

    const result = await CVSubSkillTable.insert(DATA);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editSubSkill = async (req, res) => {
  try {
    const result = await CVSubSkillTable.update(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const edu = await CVSubSkillTable.getByUserID({ userID });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;

    const edu = await CVSubSkillTable.getByID({ id });
    res.status(200).json(edu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteSubSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await CVSubSkillTable.delete({ id });
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSubSkill,
  editSubSkill,
  getByUserID,
  getByID,
  deleteSubSkill,
};
