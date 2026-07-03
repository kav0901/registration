const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Get the token from the request header
    const token = req.header('x-auth-token');

    // 2. Check if no token was sent
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied! Access blocked." });
    }

    // 3. Verify the token is real and not expired
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user's ID to the request
        next(); // The token is good! Let them pass to the next step.
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};