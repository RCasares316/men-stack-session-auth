const { Router } = require("express");
const authRoutes = require("./auth.js");

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.use("/auth", authRoutes);

module.exports = router;
