const zod = require("zod");

const emailSchema = zod.string().email();
const passwordSchema = zod.string()
.min(8, { message: "Password must be at least 8 characters long" })
.max(20, { message: "Password must be at most 20 characters long" })
.regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
.regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
.regex(/[0-9]/, { message: "Password must include at least one number" })
.regex(/[^a-zA-Z0-9]/, { message: "Password must include at least one special character" });


const signinSchema = zod.object({
    email : emailSchema,
    password : passwordSchema
})

module.exports = {signinSchema}