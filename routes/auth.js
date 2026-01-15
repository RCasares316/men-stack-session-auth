const { Router } = require("express");
const controllers = require("../controllers/auth");
const router = Router();

router.get("/register", controllers.register)

module.exports = router