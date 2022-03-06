const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { PORT, DB_URL } = require("./config.js");

const app = express();

// swagger setup

const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "UdemyClone",
      description: "Udemy clone api docs",
      contact: {
        name: "API Support",
        url: "",
      },
      servers: [
        {
          url: `http://localhost:${PORT || 9090}/`,
        },
      ],
    },
  },
  apis: ["routes/*.js"],
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
