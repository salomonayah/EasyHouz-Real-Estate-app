const jwt = require("jsonwebtoken");
const constants = require('../constants/constantsValue');

module.exports = (req, resp, next) => {
    try {
        // req.headers.authorization is equal to:  Bearer token
        const token = req.headers.authorization.split(" ")[1]; // retrieve the token only
        const decodedToken = jwt.verify(token, constants.jwtSecret); // Jwt return the payload data
        
        // rebuild the connection payload that we have used to create the token last time in userRouter file (/signIn)
        const userConnectionPayload = { email: decodedToken.email, userId: decodedToken.userId } 

        // attach this payload to all the incoming request then it will be available every where we use this middleware
        req.userData =  userConnectionPayload

        next(); // continue to the next middleware

    } catch(e) {
        console.log(e);
        resp.status(401).json({ message: "auth failed" });
    }
}