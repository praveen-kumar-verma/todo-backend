const { Router } = require("express");
const { signinSchema } = require("../validationSchemas/signinValidation");
const { User } = require("../db/userModel");
const zod = require("zod")
const userAuthMiddleware = require("../middleware/auth");
const router = Router();
require("dotenv").config();




router.get("/",userAuthMiddleware,async(req,res)=>{
    try {
        if(!req.user){
            res.status(400).json({
                error:'user not found'
            })
        }

        const userDetail = await User.findOne({ _id: req.user});

        res.status(200).json({
            userDetail
        })
        
        
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ errors: error.errors });
          } else {
            res.status(400).json({
                error:'user not found'
            })
          }
        
    }
   
})

module.exports = router