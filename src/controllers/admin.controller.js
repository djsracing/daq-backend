const Auth = require('./../models/auth.schema');
const User = require('./../models/user.schema');
const { generateCode, encrypt, decrypt, sendEmail } = require('./../utilities/utils');

const generateInvitationCode = async (req, res) => {
    try {
        const decryptedData = decrypt(req.body.data);
        const user = await User.findOne({ email: decryptedData.email });
        
        if (user && user.isActivated === true) {
            res.status(406).json({
                message: 'Account already exists!'
            });
        } else {
            const invitationCode = generateCode(8);

            const invitationCodeObj = new Auth({
                user: {
                    email: decryptedData.email,
                    role: decryptedData.role,
                    department: decryptedData.department
                },
                token: invitationCode,
                tokenType: 'INVITATION CODE',
            });
            await invitationCodeObj.save();            

            const subject = 'Invitation Code'
            const body = `Your invitation code to signup for DJSR DAQ is ${invitationCode}`;
            await sendEmail(decryptedData.email, subject, body);

            res.status(200).json({
                message: 'Invitation Code sent successfully!'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { generateInvitationCode };