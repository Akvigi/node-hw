const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User  = require("../models/user");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `This ${email} is already in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const data = await User.create({
    email: email,
    password: hashPassword,
  });

  res.status(201).json({
      message: "successfull created account",
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

    if (!user || !passwordCompare) {
        throw createError(401, `Email or password are wrong`);
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
	
  res.status(200).json({
      message: "successfull logged into base",
        user: {
            email: user.email,
        }
    })
}

module.exports = {signup, login, logout}