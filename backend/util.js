import jwt from "jsonwebtoken";
import config from "./config.js";
// import dotenv from 'dotenv';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, 
        
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    });
}

const isAuth = (req, res, next) => {
    console.log('step3');
    console.log(req);
    const token = req.headers.authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET || 'MySuperSecretPassword', (err, decode) => {
            if (err) {
                return res.status(401).send({message: 'Invalid Token'});
            } else {
                req.user = decode;
                next();

            }
        });
    }
    else {
        res.status(401).send({message: 'Token is not at all supplied'}); 
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg: 'Admin Token is not valid'});
}

export {
    getToken, isAuth, isAdmin
}