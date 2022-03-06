const mongoose = require("mongoose");
var coursesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    seats: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", coursesSchema);
