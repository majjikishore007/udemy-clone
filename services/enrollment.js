const { Enrollment } = require("../models/Enrollment");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * {
            enrolment: cources[],
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          }
 *  */

exports.createEnrollment = (req, res) => {
  req.body.enrollment.user = req.profile;
  console.log("request body", req.body);
  const enrollment = new Enrollment(req.body.enrollment);
  enrollment.save((err, enrollment) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in Db",
      });
    }
    res.json(enrollment);
  });
};
