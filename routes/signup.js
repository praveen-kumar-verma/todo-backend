const { Router } = require("express");
const zod = require("zod");
const { userSchema } = require("../validationSchemas/userValidation");
const { User } = require("../db/userModel");
const router = Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    userSchema.parse({ username, email, password });

    const user = new User({ username, email, password });
    await user.save();


    res.status(201).send('User registered');
  } catch (error) {
    if (error instanceof zod.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // Duplicate key error (username or email already exists)
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ error: `The ${field} is already in use.` });
    }else {
      res.status(400).send('Error registering user');
    }
  }
});

module.exports = router;
