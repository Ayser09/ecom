const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const router = require("express").Router();
const requireSignIn = async (res, req, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode();
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
const isAdmin = async (res, req, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role != 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "error in admin middleware",
    });
  }
};
module.exports = {
  requireSignIn,
  isAdmin,
};
