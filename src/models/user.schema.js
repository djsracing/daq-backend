const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please enter a valid email address']
        },
        role: {
            type: String,
            enum: ['SUPER-ADMIN', 'ADMIN', 'USER'] // TODO
        },
        department: {
            type: String,
            enum: ['DV', 'VD'] // TODO
        },
        isdeleted: {
            type: Boolean,
            default: false
        }
    }, 
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;