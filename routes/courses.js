const express = require("express");
const router = express.Router();
const { getUserById } = require("../services/user");
const {
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
  getCourse,
  getAllCourses,
} = require("../services/courses");
const { isAuthenticated, isSignedIn, isAdmin } = require("../services/auth");

router.param("userId", getUserById);
router.param("courseId", getCourseById);

//create
router.post(
  "/course/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCourse
);

//read routes
router.get("/course/:courseId", getCourse);
router.get("/courses", getAllCourses);

//delete and update routes
router.delete(
  "/course/:courseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCourse
);
router.put(
  "/course/:courseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCourse
);

module.exports = router;
