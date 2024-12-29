const Errors = require("../helpers/error");
const validator = require("validator");
const AuthSerivce = require("../services/AuthService");

const signup = async (req, res) => {
  try {
    const payload = {
      email: req.body.email ?? null,
      password: req.body.password ?? null,
      name: req.body.name ?? null,
    };

    if (!payload.email || !validator.isEmail(payload.email)) {
      throw Errors.badRequestError("Invalid or missing email address");
    }

    if (
      !payload.password ||
      !validator.isLength(payload.password, { min: 3, max: 25 })
    ) {
      throw Errors.badRequestError(
        "Password must be between 3 and 10 characters."
      );
    }

    if (!payload.name) {
      throw Errors.badRequestError("name is required");
    }

    const response = await AuthSerivce.signup(payload);

    return res
      .status(201)
      .json({ status: true, message: "Signup Successfully", data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

const signin = async (req, res) => {
  try {
    const payload = {
      email: req.body.email ?? null,
      password: req.body.password ?? null,
    };

    if (!payload.email || !validator.isEmail(payload.email)) {
      throw Errors.badRequestError("Invalid or missing email address");
    }

    if (
      !payload.password ||
      !validator.isLength(payload.password, { min: 3, max: 25 })
    ) {
      throw Errors.badRequestError(
        "Password must be between 3 and 10 characters."
      );
    }

    const response = await AuthSerivce.signin(payload);

    return res
      .status(201)
      .json({ status: true, message: "Signin Successfully", data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode)
      .json({ status: false, message: error.message, data: null });
  }
};

module.exports = { signup, signin };
