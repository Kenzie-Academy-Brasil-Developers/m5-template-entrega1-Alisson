import { compare, hash } from "bcryptjs"
import { AppError } from "../errors/AppError";
import { sign } from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { userReturnSchema } from "../schemas/user.schema";
import { UserCreate, UserReturn, SessionCreate, SessionReturn } from "../interfaces/users.Interfaces";

export class UserService {
    public create = async (payload: UserCreate): Promise<UserReturn> => {
      payload.password = await hash(payload.password, 10);
      const newUser = await prisma.user.create({ data: payload });
  
      return userReturnSchema.parse(newUser);
    };
  
    public login = async ({
      email,
      password,
    }: SessionCreate): Promise<SessionReturn> => {
      const foundUser = await prisma.user.findFirst({ where: { email } });
  
      if (!foundUser) {
        throw new AppError("User not exists", 404);
      }
  
      const samePassword = await compare(password, foundUser.password);
  
      if (!samePassword) {
        throw new AppError("Email and password doesn't match", 401);
      }
  
      const token: string = sign({}, process.env.JWT_SECRET!, {
        subject: foundUser.id.toString(),
        expiresIn: "1h",
      });
  
      return {
        accessToken: token,
        user: userReturnSchema.parse(foundUser),
      };
    };
  
    public profile = async (userId: number): Promise<UserReturn> => {
      const foundUser = await prisma.user.findFirst({ where: { id: userId } });
      return userReturnSchema.parse(foundUser);
    };
  }