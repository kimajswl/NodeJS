const userController = require("../controller/UserController.js");
const authController = require("../controller/AuthController.js")

const router = require("express").Router();

router.post("/signup", userController.signup);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/login",authController.login );

module.exports = router;