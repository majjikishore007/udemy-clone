const express = require("express");
const router = express.Router();

const { isAuthenticated, isSignedIn } = require("../services/auth");
const { getUserById, addEnrollmentInUserList } = require("../services/user");
const { UpdateSeatCount } = require("../services/courses");
const { createEnrollment } = require("../services/enrollment");

//prrams
router.param("userId", getUserById);

//create
router.post(
  "/enrollment/create/:userId",
  isSignedIn,
  isAuthenticated,
  UpdateSeatCount,
  addEnrollmentInUserList,
  createEnrollment
);

module.exports = router;
