const AbsensiModel = require("../models/absensi");

exports.getAbsensi = async (req, res) => {
  const absensi = await AbsensiModel.findAll();
  res.status(200).json({
    absensi,
    metadata: "test absensi endpoint",
  });
};
exports.checkin = async (req, res) => {
  const { nip } = req.body;
  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "in",
  });
  res.status(200).json({
    absensi: absensi,
    metadata: "checkin berhasil",
  });
};
exports.checkout = async (req, res) => {
  const { nip } = req.body;
  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "out",
  });
  res.status(200).json({
    absensi: absensi,
    metadata: "checkout berhasil",
  });
};
