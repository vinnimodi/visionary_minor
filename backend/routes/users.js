const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get(async (req, res) => {
  const data = await User.find();
  const users = data.json();
  res.json(users);
  // catch(err => res.status(400).json('Error: ' + err));
});

router.route("/add").post(async (req, res) => {
  const data = req.body;
  const newUser = new User(data);

  await newUser.save();
  res.json("User added!");
  // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
