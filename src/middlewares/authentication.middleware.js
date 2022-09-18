const Auth = require('./../models/auth.schema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = {
    verifyJwt: async (req, res, next) => {
        try{
            if (req.header('Authorization')) {
                const token = req.header('Authorization').replace('Bearer ', '');
                if (!token) {
                    res.status(401).json({
                        message: 'Please Authenticate!'
                    });
                } else {
                    const jwtVerify = jwt.verify(token, process.env.JWT_SECRET);

                    if (!jwtVerify) {
                        res.status(401).json({
                            message: 'Please Authenticate!'
                        });
                    } else {
                        const checkToken = await Auth.findOneAndUpdate({ token: token }, { lastAccess: new Date() }, { new: true });

                        if (!checkToken) {
                            res.status(401).json({
                                message: 'Please Authenticate!'
                            });
                        } else {
                            req.token = token;
                            req.userId = jwtVerify['id'];
                            req.email = jwtVerify['email'];
                            req.role = jwtVerify['role'];
                            req.department = jwtVerify['department'];
                            req.isActivated = jwtVerify['isActivated'];

                            next();
                        } 
                    }
                }
            } else {
                res.status(401).json({
                    message: 'Please Authenticate!'
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }, 

    accountActivatedTrue: (req, res, next) => {
        try {
            if (req.isActivated === true) {
                next();
            } else {
                res.status(401).json({
                    message: 'Please activate your account!'
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    accountActivatedFalse: (req, res, next) => {
        try {
            if (req.isActivated === false) {
                next();
            } else {
                res.status(401).json({
                    message: 'Account already activated!'
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
};

module.exports = auth;