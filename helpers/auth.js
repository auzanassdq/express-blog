const jwt = require("jsonwebtoken")

module.exports = {
  tokenValid: (req, res, next) => {
    jwt.verify(req.headers.authorization.split(" ")[1],
      "secret", function (err, decode) {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          next()
        }
      }
    )
  }
}