const express = require("express");
const user = express.Router();

const username = "admin"; //user and pass initialize
const password = "123";

user.get("/", (req, res) => {
    if(req.session.user){
        res.render("home");
    }else{
        if(req.session.passwordwrong){
            res.render("login", {msg:"Invalid username or password"});
        }else{
            res.render("login");
        }
    } 
})

user.post("/verify", (req, res) => {
    console.log(req.body);   

    if(req.body.username === username && req.body.password === password){
        req.session.user = req.body.username;
        req.session.passwordwrong = false;
        res.redirect("/home");  // Redirect to home after successful login
    }else{
        req.session.passwordwrong = true;
        res.redirect("/");  // Redirect back to login if credentials are wrong
    }
});

user.get("/home", (req, res) =>{
    if(req.session.user){
        res.render("home");
    }else{
            res.redirect("/"); // Redirect to login if the user is not authenticated
        }
});

user.get("/logout", (req,res) =>{
    req.session.destroy();
    res.render("login", {outmsg:"Logedout successfully..."});
})



module.exports = user;