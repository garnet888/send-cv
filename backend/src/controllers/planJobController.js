const PlanJobTable = require("../tables/planJobTable");

const getPlanJob = async (req, res) => {
  try {
    const { userID } = req.params;

    const plan = await PlanJobTable.getByUserID({ userID });
    res.status(200).json(plan);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const addEditPlanJob = async (req, res) => {
  try {
    const { userID } = req.params;

    const DATA = {
      userID,
      ...req.body,
    };

    const plan = await PlanJobTable.getByUserID({ userID });

    if (plan) {
      const result = await PlanJobTable.update(DATA);
      res.status(200).json(result);
    } else {
      const result = await PlanJobTable.insert(DATA);
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlanJob, addEditPlanJob };
