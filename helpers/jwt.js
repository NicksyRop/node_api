var { expressjwt } = require("express-jwt");
function authJwt() {
  return expressjwt({
    secret: process.env.secret,
    algorithms: ["HS256"],
  });
}

module.exports = authJwt;
