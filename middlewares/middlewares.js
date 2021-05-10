const verify = require("jsonwebtoken").verify;
require("dotenv").config();

module.exports = {
  verifyToken: function (req, res, next) {
    const token = req.headers["x-access-token"];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    verify(token, secret, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });

      req.decoded = decoded;
      next();
    });
  },
};
