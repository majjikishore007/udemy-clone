const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const EnrollmentCartSchema = mongoose.Schema({
  course: {
    type: ObjectId,
    ref: "Course",
  },
  name: String,
  price: Number,
});

const EnrollmentCart = mongoose.model("EnrollmentCart", EnrollmentCartSchema);

const EnrollmentSchema = mongoose.Schema(
  {
    courses: [EnrollmentCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recived",
      //using enums
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recived"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

module.exports = { Enrollment, EnrollmentCart };
