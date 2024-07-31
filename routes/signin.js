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
            return res.status(400).json({
                error:'User not found'
            }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid credentials'
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

        res.json({ token });



        
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ errors: error.errors });
          } else {
            res.status(400).json({
                error:'Error registering user'
            })
          }
        
    }
   
})

module.exports = router