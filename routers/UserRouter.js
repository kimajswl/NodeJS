const userController = require("../controller/UserController.js");

const router = require("express").Router();

router.post("/addUser", userController.addUser);

module.exports = router;