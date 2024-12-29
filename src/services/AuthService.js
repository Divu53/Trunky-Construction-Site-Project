const Errors = require("../helpers/error");
const UserRepository = require("../repositiory/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthSerivce {
  async signup(payload) {
    try {
      const isUserExist = await UserRepository.checkUsesExistWithEmail(
        payload.email
      );

      if (isUserExist) {
        throw Errors.badRequestError(
          "User already registered with this email."
        );
      }

      const hashPassword = await bcrypt.hash(payload.password, 10);

      await UserRepository.createUser({
        password: hashPassword,
        email: payload.email,
        name: payload.name,
      });

      return null;
    } catch (error) {
      throw Errors(error.statusCode, error.message);
    }
  }

  async signin(payload) {
    try {
      const checkUserExist = await UserRepository.checkUsesExistWithEmail(
        payload.email
      );

      if (!checkUserExist) {
        throw Errors.badRequestError("User not registered");
      }

      const isPasswordMatch = await bcrypt.compare(
        payload.password,
        checkUserExist.password
      );

      if (!isPasswordMatch) {
        throw Errors.badRequestError("Invalid password");
      }

      const secret = process.env.JWT_SECRET;

      const token = jwt.sign(
        {
          email: checkUserExist.email,
          userId: checkUserExist.id,
        },
        secret,
        {
          expiresIn: "1w",
        }
      );

      return { token };
    } catch (error) {
      throw new Errors(error.statusCode, error.message);
    }
  }
}

module.exports = new AuthSerivce();
