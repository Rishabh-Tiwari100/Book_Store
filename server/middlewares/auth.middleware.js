import jwt from "jsonwebtoken";

  export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user info' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  next();
};