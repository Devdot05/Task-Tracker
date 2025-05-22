const mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
require('dotenv').config()
const mongodb_uri = process.env.URI

mongoose.connect(mongodb_uri)
.then(()=>{
    console.log('mongodb connected');
    
}).catch((err) => {
    console.log(err);
    
})

const userSchema = mongoose.Schema({
    firstName: {type: String, require: [true, 'First name is required']},
    lastName: {type: String, require: [true, 'Last name is required']},
    email: {type: String, require: [true, 'Email is required'], unique: true},
    password: {type: String, require: [true,'password is required']},
    googleId: {type: String}
})

let saltRound = 10
userSchema.pre("save", function(next){
    console.log(this.password);
    bcrypt.hash(this.password,saltRound, (err, hashedPassword)=>{
        if(err){
            console.log('hash was not successful');
            
        }else{
            console.log(hashedPassword);
            this.password = hashedPassword
            next()
            
        }
    })
    
})

userSchema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, same) => {
        if(!err){
            callback(err,same)
            
        }else{
            next()
        }
    })
}
module.exports = mongoose.model("users", userSchema)