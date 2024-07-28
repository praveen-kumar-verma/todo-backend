const express =  require("express");
const app = express() 
const signinRouter = require("./routes/signin")
const signupRouter = require("./routes/signup")
const taskRouter = require("./routes/tasks")

const mongoose = require("mongoose");



app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/",signinRouter)
app.use("/signup", signupRouter)
app.use("/task", taskRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("runnig")
})
