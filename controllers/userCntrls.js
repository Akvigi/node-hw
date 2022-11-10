const fs = require("fs/promises");
const path = require("path");

const Jimp = require("jimp");
const User = require("../models/user");
const { PORT } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).quality(60).write(`./public/avatars/${filename}`);
  });

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join(`http://localhost:${PORT}/avatars`, filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    message: "avatar successfull updated",
    data: { avatarURL },
  });
};

module.exports = {updateAvatar};