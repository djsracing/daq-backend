const Auth = require('./../models/auth.schema');
const User = require('./../models/user.schema');
const { encrypt, decrypt } = require('./../utilities/utils');
const { generateBearerToken } = require('./../utilities/utils');

const microsoftCallback = async (req, res) => {
    let user = req.user;
    if (user !== null) {
        let isActivated = user['isActivated'];
        let redirectUrl = '';

        // USER DOES NOT EXIST, SIGNUP
        if (!isActivated) {
            // TODO
        }

        // USER ALREADY EXISTS, LOGIN
        else {
            // TODO
        }

        res.status(301).redirect(process.env.APP_URL + redirectUrl);
    }
};

const microsoftFailure = async (req, res) => {
    //TODO
    res.status(301).redirect(process.env.APP_URL + redirectUrl);
};

const verifyInvitationCode = async (req, res) => {
    try {
        const decryptedData = decrypt(req.body.data);
        const user = await User.findOne({ email: decryptedData.email });

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        } else {
            if (user.isActivated === true) {
                res.status(400).json({
                    message: 'Account already activated!'
                });
            } else {
                const auth = await Auth.findOne({ token: decryptedData.token });

                if (!auth) {
                    res.status(400).json({
                        message: 'Invalid invitation code'
                    });
                } else {
                    if (user.email !== auth.user.email) {
                        res.status(400).json({
                            message: 'Invalid invitaion code'
                        });
                    } else {
                        user.role = auth.user.role;
                        user.department = auth.user.department;
                        user.isActivated = true;
                        await user.save();

                        const { jwtToken, expireDate } = await generateBearerToken(user);

                        const dataObj = {
                            user: user,
                            token: jwtToken,
                            expireDate: expireDate
                        };

                        const encryptedData = encrypt(dataObj);

                        res.status(200).json({
                            message: 'User account activated',
                            data: encryptedData
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    microsoftCallback,
    microsoftFailure,
    verifyInvitationCode
}