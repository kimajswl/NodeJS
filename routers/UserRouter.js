const userController = require("../controller/UserController.js");
const authController = require("../controller/AuthController.js")

const router = require("express").Router();

// CRUD
router.post("/signup", userController.signup);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

// JWT 인증
router.post("/login",authController.login );
router.get("/protected", authController.authenticateToken, authController.protectedService);
router.get("/refreshExpired", authController.refreshExpiredToken)
// authenticateToken에서 오류 없이 잘 넘어가면 protectedService 실행

module.exports = router;