const crypto = require('crypto-js');

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

module.exports = {
    generateCode,
    encrypt,
    decrypt
};