const express = require("express");
const {
  // getUserByID,
  getAllUsers,
  // updateUser,
  // changePassword,
  // deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

// router.get("/byID/:id", getUserByID);
router.get("/list", getAllUsers);
// router.put("/update", updateUser);
// router.put("/change-password", changePassword);
// router.delete("/delete", deleteUser);

module.exports = router;
