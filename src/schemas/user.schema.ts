import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

const userCreateSchema = userSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({ password: true });

const sessionCreateSchema = userSchema.pick({ email: true, password: true });

export { sessionCreateSchema, userCreateSchema, userReturnSchema, userSchema };
