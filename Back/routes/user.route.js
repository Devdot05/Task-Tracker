const express = require("express");
const { register, userLogin, } = require("../controllers/user.controller");
const userRouter = express.Router()
 


userRouter.post("/register", register)
userRouter.post("/login",userLogin)
// userRouter.get("/protected", getProtected)

 
 
module.exports = userRouter
