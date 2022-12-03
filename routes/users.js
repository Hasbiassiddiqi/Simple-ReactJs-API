const express = require("express");
const router = express.Router();
const controller = require("../controller/users");

// routing endpoint users utama
router.get("/", controller.getUsers);
router.post("/", controller.register);
router.put("/", controller.editUsers);
router.post("/login", controller.login);

module.exports = router;
