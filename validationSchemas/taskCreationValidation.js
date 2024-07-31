const { z } = require('zod');

const taskSchema = z.object({
    title: z.string().nonempty({ message: 'Title is required' }),
    description: z.string().optional(),
    status: z.enum(['todo', 'inprogress', 'underreview', 'finished']),
    priority: z.enum(['low', 'medium', 'urgent']).optional(),
    deadline: z.date().optional(),
});

module.exports = { taskSchema };