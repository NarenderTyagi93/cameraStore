const express = require("express");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const {
  BAD_CLIENT_REQUEST_400_OBJ,
  BAD_INTERNAL_500_OBJ,
} = require("../../custom/responseMessages");
const sendResponse = require("../../custom/response");
const { login } = require("../../services/auth");

const auth = express.Router();

auth.post("/login", async (req, res) => {
  try {
    /*  Get the req.body and validate it */
    req.check("email", "user email is required").exists();
    req.check("password", "password is required").exists();

    const reqErrors = req.validationErrors();
    if (reqErrors) {
      return sendResponse(
        res,
        BAD_CLIENT_REQUEST_400_OBJ.code,
        {},
        reqErrors[0].msg
      );
    }
    const { email, password } = req.body;
    const result = await login({ email, password });
    const { status } = result;
    if (!result.success) {
      return sendResponse(res, status.code, {}, status.info);
    }

    const { user } = result.data;
    const tokenPayload = user;

    /**
     * Create tokens and send with response
     */
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY_DURATION,
      algorithm: process.env.ACCESS_TOKEN_ALGO,
    });

    // attach the tokens in the header
    res.header("x-access-token", token);

    const responseData = {
      user: user,
      token,
      tokenExpiryTime:
        new Date().getTime() + ms(process.env.TOKEN_EXPIRY_DURATION),
    };
    return sendResponse(res, status.code, responseData, status.info);
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      BAD_INTERNAL_500_OBJ.code,
      {},
      BAD_INTERNAL_500_OBJ.info
    );
  }
});

auth.get("/user", async (req, res) => {
  try {
    console.log(await db.users.find().lean());
    // let newUser = new db.users({
    //   name: "Narender Tyagi",
    //   password: "$2a$08$AiuaDF3CbJWTtBHdjvRJI.k7qrDg7XJTVJSZfuFEusvpsraPjhAYe",
    //   email: "narendertyagi93@gmail.com",
    //   contact: 9999402624,
    // });
    // await newUser.save();
    res.status(200).json({ message: "Camera-Store HEALTH: OK!" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = auth;
