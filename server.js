// const { json } = require("body-parser");
const express = require("express");
const app = express();
const hbs = require("hbs");
const session = require("express-session");
const nocache = require("nocache");

app.use(express.static("public"));
app.set("view engine", "hbs");

app.use(express.urlencoded({extended: true}));      //middleware functions
app.use(express.json());        //To convert

const userRouter = require("./routes/user");        //import a router

app.use(session({
    secret:"keyboard cat",
    resave: false,
    saveUninitialized: true,
}));

app.use(nocache());

app.use("/", userRouter)


app.listen(1001, () => {
    console.log("Server running on port 1001");    
})