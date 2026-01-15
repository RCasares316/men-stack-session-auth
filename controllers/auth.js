const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  res.render("auth/register.ejs");
};

const registerUser = async (req, res) => {
  //ensure username isnt taken
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    retures.send("Username already taken.");
  }
  //ensure password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }
  //hash password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  //creat user
  await User.create({ username: req.body.username, password: hashedPassword });

  //redirect
  res.redirect("/");
};

const login = (req, res) => {
  res.render("auth/login.ejs");
};

const loginUser = async (req, res) => {
  //ensure username is correct
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }
  //ensure password is correct
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }
  //mange
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };
  res.redirect("/");
};

const signOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  register,
  registerUser,
  login,
  loginUser,
  signOut,
};
