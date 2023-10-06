const express = require("express");
const {
  addHistory,
  editHistory,
  getByUserID,
  getByID,
  deleteHistory,
} = require("../controllers/cvJobHisController");

const router = express.Router();

router.post("/:userID", addHistory);
router.put("/", editHistory);
router.get("/:userID", getByUserID);
router.get("/single/:id", getByID);
router.delete("/:id", deleteHistory);

module.exports = router;
