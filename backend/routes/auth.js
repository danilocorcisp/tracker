const router = require("express").Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
    // VALIDATING THE DATA
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECKING IF THE USER IS ALREADY IN THE DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //CREATING A NEW USER
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

//CREATING THE LOGIN ROUTE
router.post("/login", async (req, res) => {
    // VALIDATING THE DATA
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECKING IF THE EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email does not exists");

    //CHECKING THE PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    res.send("Logged in");
});

module.exports = router;
