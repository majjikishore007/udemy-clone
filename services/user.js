const User = require("../models/User");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER not found ",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "your not authorized to this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};
exports.deleteUser = (req, res) => {
  User.deleteOne({ id: req.profile._id }, (err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: `unable to remove user ${deletedUser}`,
      });
    }
    res.json({
      message: `successfuly removed the user ${deletedUser}`,
    });
  });
};
exports.getEnrolledList = (req, res) => {
  User.findOne({ id: req.profile._id })
    .select("enrolled")
    .exec((err, enrolled) => {
      if (err) {
        return res.status(404).json({
          error: "No enrolled courses",
        });
      }
      res.json(enrolled);
    });
};

exports.addEnrollmentInUserList = (req, res, next) => {
  const { _id, name, description } = req.body.enrollment.course;
  let enrollments = [];
  enrollments.push({
    _id: _id,
    name: name,
    description: description,
    price: req.body.enrollment.price,
    transaction_id: req.body.enrollment.transaction_id,
  });
  //storing in db

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { enrollments: enrollments } },
    { new: true },
    (err, e) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save the purchase list ",
        });
      }
      console.log("pused ::::::::", e);
      next();
    }
  );
};