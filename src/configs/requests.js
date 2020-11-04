const errorsCode = require("./errorList.js");

function apiRes({status, response = null, error}) {
  let responseObject;

  if (status === "ok") {
    responseObject = {
      status: status,
      response: response,
    };
  } else {
    responseObject = {
      status: status,
      error: errorsCode.find((item) => item.error_code === error),
    };
  }
  return responseObject;
}

module.exports = apiRes;
