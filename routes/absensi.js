const express = require("express");
const router = express.Router();
const controller = require("../controller/absensi");

// routing endpoint users utama
router.get("/", controller.getAbsensi);
router.post("/checkin", controller.checkin);
router.post("/checkout", controller.checkout);

module.exports = router;
