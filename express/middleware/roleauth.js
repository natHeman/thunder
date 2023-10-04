// const jwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.json");

module.exports = authorize;

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    // jwt({
    //     secret: "shhhhhhared-secret",
    //     audience: "http://myapi/protected",
    //     issuer: "http://issuer",
    //     algorithms: ["HS256"],
    //   })
    // jwt({
    //   secret: "shhhhhhared-secret",
    //   audience: "http://myapi/protected",
    //   issuer: "http://issuer",
    //   algorithms: ["HS256"],
    // }),

    jwt.sign(
      { user_id: "saddadfsasda", email: "hemanthnat7795@gmail.com" },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    ),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      next();
    },
  ];
}
