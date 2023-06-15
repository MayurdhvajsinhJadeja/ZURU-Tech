const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    {user:{ username: user.username, id: user.id }},
    "jwtsecret"
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (accessToken){
    try {
      const validToken = verify(accessToken, "jwtsecret");
      if (validToken) {
        req.user = validToken.user
        // console.log(validToken.user);
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      res.status(400).json({ error: "Access Token Doesn't Match!" });
    }
  } else {
    res.status(400).json({ error: "User not Authenticated!" });
  }
    // return res.status(400).json({ error: "User not Authenticated!" });

  
};

module.exports = { createTokens, validateToken };
