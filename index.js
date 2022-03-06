const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {PORT}=require('./config.js')

const app = express();

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
          url: `http://localhost:${PORT|| 9090}/`,
        },
      ],
    },
  },
  apis: ["routes/*.js"],
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT|| 9090, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})