var express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser } = require("../services/user");
const { isAuthenticated, isSignedIn } = require("../services/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
