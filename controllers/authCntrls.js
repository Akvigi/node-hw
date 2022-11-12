const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User  = require("../models/user");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require('../helpers/sendEmail');
// const verifyEmail = require('../helpers/verifyEmail');

const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `This ${email} is already in use`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  
  const verificationToken = nanoid();
  
  await sendEmail(email, verificationToken);
  const data = await User.create({
    email: email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
      message: "successfull created account, email sent to your mail, pls verify your account",
      user: {
        email: data.email,
      },
    },
  );
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({ message: "Logout success" });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user.verify) {
      throw createError(403, "verify account pls!")
    }
    if (!user) {
      throw createError(401, `Email is wrong`);
    }
    if (!passwordCompare) {
        throw createError(401, `Email or password are wrong`);
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token: token });
	
  res.status(200).json({
    message: "successfull logged into base",
    token: token,
        user: {
          email: user.email,
        }
    })
}

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, `User not found`);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

   res.status(200).json({
    data: {
      message: "Verification successful",
    },
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, `User not found`);
  }
  if (user.verify) {
    throw createError(400, "Verification has already done");
  }

  await sendEmail(email, user.verificationToken);
 
  res.status(200).json({
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = {signup, login, logout, verify, resendEmail}