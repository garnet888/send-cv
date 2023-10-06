const express = require("express");
const {
  addJobSkill,
  editJobSkill,
  getByUserID,
  getByID,
  deleteJobSkill,
} = require("../controllers/cvJobSkillController");

const router = express.Router();

router.post("/:userID", addJobSkill);
router.put("/", editJobSkill);
router.get("/:userID", getByUserID);
router.get("/single/:id", getByID);
router.delete("/:id", deleteJobSkill);

module.exports = router;
