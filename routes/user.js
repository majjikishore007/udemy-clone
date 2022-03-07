var express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  deleteUser,
  getEnrolledList,
} = require("../services/user");
const { isAuthenticated, isSignedIn } = require("../services/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get(
  "/user/enrolled/:userId",
  isSignedIn,
  isAuthenticated,
  getEnrolledList
);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.delete("/user/:userId", isSignedIn, isAuthenticated, deleteUser);

module.exports = router;
