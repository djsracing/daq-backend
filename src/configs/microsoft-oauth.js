const passport = require('passport');
const { Strategy } = require('passport-microsoft');
const User = require('./../models/user.schema');
const { generateBearerToken } = require('./../utilities/utils');
const dotenv = require('dotenv').config();

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    cb(null, user);
});

// Configuring passport microsoft startegy
passport.use(new Strategy(
    {
        clientID: process.env.MICROSOFT_OAUTH_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.MICROSOFT_OAUTH_CALLBACK_URL,
        scope: ['user.read']
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken, profile);
        const user = await User.findOne({ email: profile.emails[0].value });
        
        if (user && user !== null) {
            if (user.isActivated === true) {
                const  { token, expireDate } = generateBearerToken(user);
                return done(null, { ...user.toObject(), isActivated: true, token: token });
            } else {
                return done(null, { ...user.toObject(), isActivated: false });
            }
        }
        else {
            const user = new User(
                {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    isActivated: false
                }
            );
            await user.save();
            return done(null, { ...user?.toObject(), isActivated: false });
        }
    }
));