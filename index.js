const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { PORT, DB_URL } = require("./config.js");

const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");
const userRoutes = require("./routes/user");
const enrollmentRoutes = require("./routes/enrollment");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.get('/', (req, res) => {
res.send("welocme")
})
app.use("/api", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", coursesRoutes);
app.use("/api/", enrollmentRoutes);
// database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("💚 DB IS CONNECTED");
    app.listen(PORT, () => {
    console.log(`💚 💙 💛 app is  listening on ${PORT}`);
  });
  })
  .catch((err) => {
    console.error(err.message);
  });

// server startup

