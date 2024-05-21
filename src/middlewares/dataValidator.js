const checkEmailIsValid = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({error: "Email is required"});
    }
    if (!email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address"});
    }
    next();
};

module.exports = {checkEmailIsValid}