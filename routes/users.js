const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UsersModel = require("../models/users");
const passwordCheck = require("../utils/passwordCheck");

// routing endpoint users utama
router.get("/", async (res) => {
  const users = await UsersModel.findAll();

  res.status(200).json({
    data: users,
    metadata: "test user endpoint",
  });
});
router.post("/", async (req, res) => {
  const { nip, nama, password } = req.body;
  try {
    const encryptedPass = await bcrypt.hash(password, 10);
    const users = await UsersModel.create({
      nip,
      nama,
      password: encryptedPass,
    });
    res.status(200).json({
      registered: users,
      metadata: "test user endpoint",
    });
  } catch (e) {
    res.status(400).json({
      error: "data tidak dapat di masukan",
    });
  }
});
router.put("/", async (req, res) => {
  const { nip, nama, password, newPass } = req.body;
  try {
    const check = await passwordCheck(nip, password);
    const encryptedPass = await bcrypt.hash(newPass, 10);
    if (check.compare === true) {
      const users = await UsersModel.update(
        { nama, password: encryptedPass },
        { where: { nip: nip } }
      );
      res.status(200).json({ users, metadata: "data updated" });
    }
  } catch (e) {
    res.status(400).json({ error: "data invalid" });
  }
});
router.post("/login", async (req, res) => {
  const { nip, password } = req.body;
  try {
    const check = await passwordCheck(nip, password);
    if (check.compare === true) {
      res.status(200).json({
        users: check.userData,
        metadata: "login successs",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "data invalid",
    });
  }
});

module.exports = router;
