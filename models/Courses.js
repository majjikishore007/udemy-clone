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
coursesSchema.methods = {
  areSeatsFull: function () {
    return this.seats < 0 ? true : false;
  },
};


module.exports = mongoose.model("Course", coursesSchema);
