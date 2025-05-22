const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 2224
const userRouter = require("./routes/user.route")
const cors = require('cors');
const session = require('express-session')
// require('./path/to/controller/file');  
const todoRouter = require('./routes/todo.route');
const SESSION_SECRET = process.env.SESSION_SECRET

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

 
app.use(cors())
app.use(express.json({limit:"500mb"}))
app.use(express.urlencoded({extended:true, limit:"500mb"}))

 
app.use("/",userRouter, todoRouter)         
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})

