const router = require("express").Router();
let User = require("../models/user");
const Joi = require("@hapi/joi");

//VALIDATION
const schema = {
    name: Joi.string().min(2).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
};

router.post("/register", async (req, res) => {
    // VALIDATING THE DATA
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
