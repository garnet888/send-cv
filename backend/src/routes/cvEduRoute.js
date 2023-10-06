const express = require("express");
const {
  getLevels,
  addEducation,
  editEducation,
  getByUserID,
  getByID,
  deleteEducation,
} = require("../controllers/cvEduController");

const router = express.Router();

router.get("/get-levels", getLevels);
router.post("/:userID", addEducation);
router.put("/", editEducation);
router.get("/:userID", getByUserID);
router.get("/single/:id", getByID);
router.delete("/:id", deleteEducation);

module.exports = router;
