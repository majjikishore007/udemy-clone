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
