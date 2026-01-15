const { Router } = require("express");
const controllers = require("../controllers/auth");
const router = Router();

router.get("/register", controllers.register)
router.post("/register", controllers.registerUser)
router.get("/login", controllers.login)
router.post("/login", controllers.loginUser)
router.get("/sign-out", controllers.signOut)

module.exports = router