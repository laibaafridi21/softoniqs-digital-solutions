const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith  ("Bearer ")) {
        return res.status(401).json({
            error: "Access denied. Please Log in."

        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role  !== "admin")  {
return res.status(403).json({
    error: "Admin access required."

});
        }
        req.admin = decoded;

        next();
    } catch (error){
        return res.status(401).json({
            error: "Invalid  or expired token. Please Log in again"
        });
    }
}

module.exports =authMiddleware;
