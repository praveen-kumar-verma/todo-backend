const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title : {type: String, required:true},
    description:{type:String},
    status:{
        type: String,
        enum: ['todo', 'inprogress', 'underreview', 'finished'],
        require: true
    },
    priority:{
        type: String,
        enum: ['low','medium', 'urgent']
    },
    deadline : {type: Date},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    }

})

const Task = mongoose.model("Task", TaskSchema);


module.exports= {Task}