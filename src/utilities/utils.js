const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const Auth = require('./../models/auth.schema');

// Dynamic length code generation function
const generateCode = (codeLength) => {
    let digits = '0123456789';
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += digits[Math.floor(Math.random()*10)];
    }
    return code;
};

// Data encryption function
const encrypt = (data) => {
    const encryptData = crypto.AES
        .encrypt(JSON.stringify(data), process.env.CRYPTO_KEY)
        .toString();
    return encryptData;
};

// Data decryption function
const decrypt = (data) => {
    const decryptData = crypto.AES.decrypt(data, process.env.CRYPTO_KEY);
    const decryptDataObj = JSON.parse(decryptData.toString(crypto.enc.Utf8));
    return decryptDataObj;
};


const generateBearerToken = async (user) => {
    const jwtToken = jwt.sign({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
    }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);

    await new Auth({
        token: jwtToken,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            department: user.department
        },
        tokenType: 'BEARER',
        expireAt: expireDate,
        lastAccess: new Date()
    }).save();

    return {
        jwtToken,
        expireDate
    };
}

module.exports = {
    generateCode,
    encrypt,
    decrypt,
    generateBearerToken
};