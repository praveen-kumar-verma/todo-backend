const { Router } = require("express");
const { signinSchema } = require("../validationSchemas/signinValidation");
const { User } = require("../db/userModel");
const zod = require("zod")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = Router();
require("dotenv").config();




router.post("/",async(req,res)=>{
    const {email, password}=  req.body;
    try {
        signinSchema.parse({email, password})

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });



        
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ errors: error.errors });
          } else {
            res.status(400).send('Error registering user');
          }
        
    }
   
})

module.exports = router