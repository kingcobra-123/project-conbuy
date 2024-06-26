import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    
    try{

        let  token =req.header("Authorization");
        
        if(!token) {
            return res.status(403).send("Not authenticated");
        }

        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();   
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verified", verified);
        req.user = verified;
        next();

    } catch (error) {
        console.log("Middlewareerror ", error);
        res.status(401).json({error: error.message});
    }
}