const mongoose = require('mongoose')
 
require('dotenv').config()
 


let todoSchema = mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    done: {type:Boolean, default: false},
    // date: Date.now,
    dueDate: Date,  
    date: { type: Date, default: Date.now }
})

let todoModel = mongoose.model("todos", todoSchema)

module.exports = todoModel