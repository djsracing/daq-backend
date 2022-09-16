const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        user: {
            type: {
                id: {
                    type: String
                },
                email: {
                    type: String
                },
                role: {
                    type: String // TODO enum
                },
                department: {
                    type: String // TODO enum
                }
            }
        },
        token: {
            type: String
        },
        tokenType: {
            type: String,
            enum: ['BEARER', 'INVITATION CODE']
        },
        expireAt: {
            type: Date,
        },
        lastAccess: {
            type: Date
        }
    },
    { timestamps: true }
);

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;