const Courses = require("../models/Courses");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getCourseById = (req, res, next, id) => {
  Courses.findById(id).exec((err, course) => {
    if (err) {
      return res.status(404).json({
        error: "course not found",
      });
    }
    req.course = course;
    next();
  });
};

exports.createCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds, file) => {
    if (err) {
      return res.status(404).json({
        error: "problem with the image",
      });
    }
    console.log(feilds);
    //destructuring the feilds
    const { name, description, price, seats } = feilds;
    // console.log(name);
    if (!name || !description || !price || !seats) {
      console.log("missing some details ");
      return res.status(404).json({
        error: "ALL deatils must be included",
      });
    }

    let course = new Courses(feilds);

    //save to the db

    course.save((err, course) => {
      if (err) {
        res.status(400).json({
          error: "saving in the db failed!",
        });
      }
      res.json(course);
    });
  });
};
exports.getCourse = (req, res) => {
  return res.json(req.course);
};

exports.deleteCourse = (req, res) => {
  let course = req.course;

  course.remove((err, deletedCourse) => {
    if (err) {
      return res.status(400).json({
        error: `unable to delete course ${deletedCourse}`,
      });
    }
    res.json({
      message: `successfuly deleted the course ${deletedCourse}`,
    });
  });
};

exports.updateCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds) => {
    if (err) {
      return res.status(404).json({
        error: "Something went wrong !",
      });
    }

    Courses.findByIdAndUpdate(
      { _id: req.course._id },
      { $set: feilds },
      { new: true, useFindAndModify: false },
      (err, updatedcourse) => {
        if (err) {
          return res.status(400).json({
            error: "your not authorized to this todo",
          });
        }
        res.json(updatedcourse);
      }
    );
  });
};
exports.getAllCourses = (req, res) => {
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Courses.find()
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, courses) => {
      if (err) {
        return res.status(404).json({
          err: "no  courses found",
        });
      }
      res.json(courses);
    });
};
exports.UpdateSeatCount = async (req, res, next) => {
  const data = await Courses.findOne({
    _id: req.body.enrollment.course._id,
  }).exec();
  console.log("data seats", data.seats);
  if (data.seats > 0) {
    Courses.findByIdAndUpdate(
      { _id: req.body.enrollment.course._id },
      { $inc: { seats: -1 } },
      { new: true, upsert: true },
      (err, updatedcourse) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "your not authorized to this todo",
          });
        }
        next();
      }
    );
  } else {
    res.status(200).json({ message: "no seats avilable" });
  }
};