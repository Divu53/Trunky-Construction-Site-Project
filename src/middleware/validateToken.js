const jwt = require("jsonwebtoken");
const models = require("../../models/index");

const validateToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (token?.includes("Bearer")) {
      token = token?.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "unauthorized", data: null });
    }

    const secret = process.env.JWT_SECRET;

    const isValidate = jwt.verify(token, secret);

    if (!isValidate) {
      return res
        .status(401)
        .json({ status: false, message: "unauthorized", data: null });
    }

    const user = await models.Users.findByPk(isValidate.userId);

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not found", data: null });
    }

    req.userId = isValidate.userId;
    req.email = isValidate.email;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: false, message: "unauthorized", data: null });
  }
};

module.exports = validateToken;
