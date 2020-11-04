const { Router } = require("express");
const router = Router();
const userModel = require("../models/userModel.js");
const resObj = require("../configs/requests.js");

router.get("/user.get", async (req, res) => {
  let users = await userModel.find({});
  res.send(
    resObj({
      status: "ok",
      response: users,
    })
  );
});

module.exports = router;
