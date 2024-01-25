const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/userDetailsController");

// get all user details
router.get("/", userDetailsController.getAllUserDetails);

// add user details
router.post("/", userDetailsController.addUserDetails);

// update user details
router.patch("/update/:UserID", userDetailsController.updateUserDetails);

// delete user details
router.delete("/delete/:UserID", userDetailsController.deleteUserDetails);

module.exports = router;
