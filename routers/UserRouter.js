const userController = require("../controller/UserController.js");

const router = require("express").Router();

router.post("/addUser", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;