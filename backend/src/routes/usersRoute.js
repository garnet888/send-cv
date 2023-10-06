const express = require("express");
const {
  getAllUsers,
  getUserByID,
  updateUser,
  changePassword,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/list", getAllUsers);
router.get("/:id", getUserByID);
router.put("/update", updateUser);
router.put("/change-password", changePassword);
router.delete("/:id", deleteUser);

module.exports = router;
