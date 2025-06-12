
const userModel = require('../model/user.model');
require('dotenv').config()
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY
 

 
const register = (req, res) => {
    console.log(req.body);
    const form = new userModel(req.body)
    form.save()
    .then((response) => {
        console.log(response);
        console.log("save successful");
        res.send({status:true, message: "registration was successful"});
       
        
        
    })
    .catch((err) => {
        console.log(err);
        if(err.code === 11000) {
            res.send({status: false, message: "email is already in use"})
        }
        
    })
}



let userLogin = (req, res) => {
    // console.log(req.body);
    userModel.findOne({email: req.body.email})
    .then((user) => {
        if(user){
            user.validatePassword(req.body.password, (err, same) => {
                if(err){
                    console.log(err);
                    
                }else{
                    if(same){
                        // console.log(user);
                        let token = jwt.sign({email: req.body.email},SECRET_KEY, {expiresIn: "1h"},)
                        // console.log(token);
                        
                        res.send({status: true, message: "login successful", token, user})
                    }else{
                        console.log('wrong email or password');
                        res.send({status: false, message: "wrong email or password"})
                    }

                }
            })
        }else{
            console.log("user does not exit");
            res.send({status:false, message: "wrong email or password"})
        }
        
    }).catch((err) => {
        console.log(err);
        
    })
    
}

// const getProtected = (req, res) => {
//     let token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, SECRET_KEY, (err, result)=>{
//         if(err){
//             console.log(err);
//             res.send({status: false, message: "session expired. Kindly signin again"})
//         }else{
//             console.log(result);
//             res.send({status: true, message: "Login successfully"})
//         }
//     })
    
    
// }



 

module.exports = {register,userLogin,}