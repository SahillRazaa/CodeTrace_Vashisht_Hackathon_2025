const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (error, user) => {
            if(error) {
                console.log("Token is Invalid!");
            }
            else {
                req.user = user;
                next();
            }
        })
    }
    else {
        console.log("You are not authenticated!");
    }
};

module.exports = {verifyUser};