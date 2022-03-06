const express = require("express");
const router = express.Router();
const { getUserById } = require("../services/user");
const { getCourseById, createCourse } = require("../services/courses");
const { isAuthenticated, isSignedIn, isAdmin } = require("../services/auth");

router.param("userId", getUserById);
router.param("productId", getCourseById);

router.post(
  "/course/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCourse
);
module.exports = router;
