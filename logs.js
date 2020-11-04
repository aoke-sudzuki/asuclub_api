let winston = require("winston");
const appRoot = require("app-root-path");

function getLogger(module) {
  const colors = {
    colors: {
      error: "red",
      warn: "darkred",
      info: "gray",
      http: "green",
      sql: "blue",
      debug: "orange",
    },
  };
  winston.addColors(colors);
  const colorizer = winston.format.colorize();
  return new winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "info",
        handleExceptions: true,
        json: true,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
          winston.format.printf((msg) => colorizer.colorize(msg.level, `${msg.timestamp} – ${msg.level.toUpperCase()}: ${msg.message}`))
        ),
      }),
      new winston.transports.File({
        level: "debag",
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
      }),
    ],
    exitOnError: false,
  });
}
module.exports = getLogger;
