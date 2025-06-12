const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 2224
const userRouter = require("./routes/user.route")
const cors = require('cors');
const session = require('express-session')
// require('./path/to/controller/file');  
const todoRouter = require('./routes/todo.route');
// const SESSION_SECRET = process.env.SESSION_SECRET

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

 
const allowedOrigins = [
  'https://task-tracker-tiz5.vercel.app',
  'http://localhost:5175'
];

const corsOptions = {
  origin: allowedOrigins
  // origin: function (origin, callback) {
  //   // Allow requests with no origin (like curl or Postman)
  //   if (!origin) return callback(null, true);
  //   if (allowedOrigins.includes(origin)) {
  //     return callback(null, true);
  //   } else {
  //     return callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));

app.use(express.json({limit:"500mb"}))
app.use(express.urlencoded({extended:true, limit:"500mb"}));

// app.use(session({
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true } // Use secure: false for local testing only
// }));


 
app.use("/user",userRouter)
app.use("/todo", todoRouter)    

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})

