const router = require("express").Router();
const verify = require("./verify");

router.get("/profile", verify, (req, res) => {
    Data.find()
        .then((datas) => res.json(datas))
        .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
