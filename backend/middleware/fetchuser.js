var jwt = require("jsonwebtoken");
const JWT_SECRET = "fahad123"

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');

    if (!token) {
        console.log(token);
        res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        // will only return id of a document as thats whats in JWT token
        req.user = data.user;
        next();
    } catch (errors) {
        console.log(errors);
        res.status(401).send({ error: "Please authenticate using a valid token!" });
    }

}

module.exports = fetchuser;