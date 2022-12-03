const UsersModel = require("../models/users");
const passwordCheck = require("../utils/passwordCheck");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

exports.getUsers = async (res) => {
  const users = await UsersModel.findAll();

  res.status(200).json({
    data: users,
    metadata: "test user endpoint",
  });
};
exports.register = async (req, res) => {
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
};
exports.editUsers = async (req, res) => {
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
};
exports.login = async (req, res) => {
  const { nip, password } = req.body;
  try {
    const check = await passwordCheck(nip, password);

    if (check.compare === true) {
      const token = jwt.sign({ Test: check.userData }, "ABSENSI USERS");
      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "data invalid",
    });
  }
};
