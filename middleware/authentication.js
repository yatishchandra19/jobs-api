const UnauthenticatedError = require("../errors/index");

const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch {
    throw new UnauthenticatedError("Not authorizaed to accesss this route");
  }
};

module.exports = authenticationMiddleware;
