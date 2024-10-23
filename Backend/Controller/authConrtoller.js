const { hash, compare } = require("bcryptjs");
const { Person } = require("../Schema/Schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Array to store refresh tokens
let refreshTokens = [];

// Function to generate a refresh token
function generateRefreshToken(user) {
  const payload = {
    userId: user._id,
    username: user.Username,
  };
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

//Function to generate access token
function generateAccessToken(user) {
  const payload = {
    userId: user._id,
    username: user.Username,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
}

// Register
exports.register = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const exstUser = await Person.findOne({ Username });
    if (exstUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const HashPassword = await hash(Password, 10);
    const NewUser = await Person.create({
      Username,
      Password: HashPassword,
    });
    res.status(201).json({
      message: "Utilisateur cree avec succes",
      user: NewUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: err.message,
    });
  }
};

//Login
exports.login = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const user = await Person.findOne({ Username });

    if (!user) {
      return res.status(403).json({ message: "Invalid username or password" });
    }
    const valid = await compare(Password, user.Password);
    if (!valid) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const accessToken = generateAccessToken(user);
    const refrshToken = generateRefreshToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 2 * 60 * 1000,
    });
    res.cookie("refreshToken", refrshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in successfully",
      user: { username: user.Username },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Logout
exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

//Refresh accessToken
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const refreshTokens = req.app.locals.refreshTokens;

  if (!refreshToken || !refreshTokens.includes(refreshToken))
    return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 2 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed successfully" });
  });
};
