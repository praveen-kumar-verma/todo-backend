const { Router } = require("express");
const { signinSchema } = require("../validationSchemas/signinValidation");
const { User } = require("../db/userModel");
const zod = require("zod")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const userAuthMiddleware = require("../middleware/auth");
const { Task } = require("../db/taskModel");
const router = Router();
require("dotenv").config();




router.post("/" , userAuthMiddleware , async(req,res)=>{
   const {title, description, status, priority, deadline } = req.body;

   try {
    const task = new Task({
        title,
        description,
        status,
        priority,
        deadline,
        user: req.user
    });
    await task.save();
    res.status(201).json(task);

    
   } catch (error) {
    if (error instanceof zod.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(400).send('Error creating task ');
      }
    
   }
   
   
})


router.get('/', userAuthMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', userAuthMiddleware, async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    const taskId = req.params.id;

    // Validate status and priority
    const validStatuses = ['todo', 'inprogress', 'underreview', 'finished'];
    const validPriorities = ['low', 'medium', 'urgent'];

    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority value' });
    }

    try {
        const task = await Task.findOne({ _id: taskId, user: req.user });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (deadline) task.deadline = deadline;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

module.exports = router