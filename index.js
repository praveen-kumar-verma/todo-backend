const express =  require("express");
const app = express() 
const signinRouter = require("./routes/signin")
const signupRouter = require("./routes/signup")
const taskRouter = require("./routes/tasks")
const verifyTokenRouter = require("./routes/verify-token")
const userDetailRouter = require("./routes/user-detail")


var cors = require('cors')
const mongoose = require("mongoose");



app.use(express.json());
app.use(cors())

mongoose
  .connect(process.env.MONGO_URL)


app.use("/",signinRouter)
app.use("/signup", signupRouter)
app.use("/task", taskRouter)
app.use("/verify-token",verifyTokenRouter )
app.use("/user-detail",userDetailRouter )



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
})
