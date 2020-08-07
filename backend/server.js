const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//IMPORT ROUTES

const datasRouter = require("./routes/datas");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

//MIDDLEWARES

app.use(cors());
app.use(express.json());

//CONNECT TO MANGODB

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

//ROUTE MIDDLEWARES

app.use("/datas", datasRouter);
app.use("/users", usersRouter);
app.use("/bepart", authRouter);

app.listen(port, () => {
    console.log(`Server is served on port ${port}`);
});
