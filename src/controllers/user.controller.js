import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const handleSocialLogin = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user)
      return res.status(404).json({ message: "User not found", status: 404 });

    const token = await user.generateToken();

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .redirect(process.env.CLIENT_SSO_REDIRECT_URL);
  } catch (error) {
    console.log(error);
    return res.status(500).redirect(process.env.CLIENT_SSO_REDIRECT_URL);
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user?._id)
      return res.status(404).json({ message: "Invalid token", status: 404 });

    return res.status(200).json({ data: user, status: 200 });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
};

const handleLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "User logged out successfully",
        status: 200,
        success: true,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
};

export { handleSocialLogin, getUser, handleLogout };
