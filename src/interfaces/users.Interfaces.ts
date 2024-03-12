import { z } from "zod";
import { userCreateSchema, userReturnSchema, sessionCreateSchema } from "../schemas/user.schema";

type UserCreate = z.infer<typeof userCreateSchema>;

type UserReturn = z.infer<typeof userReturnSchema>;

type SessionCreate = z.infer<typeof sessionCreateSchema>;

type SessionReturn = {
  accessToken: string;
  user: UserReturn;
};

export { SessionCreate, SessionReturn, UserCreate, UserReturn };