const jwt = require("jsonwebtoken");
const jwtsecret = require("../config/jwtSecret");

module.exports = (req, res, next) => {
    const authheader = req.get("Authorization");
    if(!authheader) {
        return res.status(401).json({error:"missing authorization header"});
    }

    try{
        const token = authheader;
        jwt.verify(token, jwtsecret);
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
    
}