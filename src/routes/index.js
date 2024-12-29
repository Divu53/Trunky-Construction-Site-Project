const express = require("express");
const authRoute = require("./authRoute.js");
const projectRoute = require("./projectRoute.js");
const validateToken = require("../middleware/validateToken.js");
const router = express.Router();

//auth routes
router.use("/auth", authRoute);

router.use(validateToken);

// project routes
router.use("/projects", projectRoute);

module.exports = router;
