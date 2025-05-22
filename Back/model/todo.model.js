const mongoose = require('mongoose')
 
require('dotenv').config()
 


let todoSchema = mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    isDone: {type:Boolean, default: false},
    dueDate: Date,  
    // date: { type: Date, default: Date.now }
})

let todoModel = mongoose.model("todos", todoSchema)

module.exports = todoModel