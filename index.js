const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { PORT, DB_URL } = require("./config.js");

const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");
const userRoutes = require("./routes/user");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes

app.use("/api", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", coursesRoutes);
// database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("💚 DB IS CONNECTED");
  })
  .catch((err) => {
    console.error(err);
  });

// server startup

app.listen(PORT, () => {
  console.log(`💚 💙 💛 app is  listening on ${PORT}`);
});
