const db = require("../models");

const User = db.users;

const addUser = async (req, res) => {
    let info = {
        username: req.body.username,
        password: req.body.password,
    };

    const user = await User.create(info).catch((err) => console.log(err));
    res.status(200).send(user);
};

module.exports = {
    addUser
};

