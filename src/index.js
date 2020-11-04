// Main libs

const express = require("express");
const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const fs = require("fs");
const resObj = require("./configs/requests.js");

// Logger

const log = require("../logs.js")(module);

// App settings

const app = express();
const PORT = process.env.PORT || 3000;

// Server start

app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://Aoke:aoke170725@asucluster.4un2d.mongodb.net/AsuClub?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    app.listen(PORT, () => {
      log.info("Server has been started at http://localhost:" + PORT + "...");
    });
    // Routes

    await fs.readdir(`${appRoot}/src/routes`, function (err, files) {
      if (!err) {
        files.forEach(function (file) {
          let routerFile = require(appRoot + "/src/routes/" + file);
          app.use(routerFile);
        });
        app.use(function (req, res) {
          res.status(404);
          res.send(
            resObj({
              status: "no",
              error: 0,
            })
          );
        });
      } else {
        log.error("Unable to scan directory: " + err);
      }
    });
  } catch (e) {
    log.error(e);
  }
}

startServer();
