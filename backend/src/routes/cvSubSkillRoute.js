const express = require("express");
const {
  addSubSkill,
  editSubSkill,
  getByUserID,
  getByID,
  deleteSubSkill,
} = require("../controllers/cvSubSkillController");

const router = express.Router();

router.post("/:userID", addSubSkill);
router.put("/", editSubSkill);
router.get("/:userID", getByUserID);
router.get("/single/:id", getByID);
router.delete("/:id", deleteSubSkill);

module.exports = router;
