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

module.exports = {
    microsoftCallback,
    microsoftFailure
}