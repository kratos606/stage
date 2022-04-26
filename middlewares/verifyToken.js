const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ error: "Unauthorized" });
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ error: "Unauthorized" });
  }
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.json({ error: "Unauthorized" });
    }
  });
};

module.exports = { verifyToken , verifyTokenAndAdmin };