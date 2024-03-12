import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/AppError";
import { JwtPayload, verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

class AuthMiddleware {
  public validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError("Token is required", 401);
    const [_, token] = authorization.split(" ");

    if (!token) throw new AppError("Token is required", 401);
    const { sub } = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    res.locals = { ...res.locals, sub };

    return next();
  };

  public isTaskOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sub = Number(res.locals.sub);
    const { foundTask } = res.locals;

    if (foundTask.userId !== Number(sub)) {
      throw new AppError("This user is not the task owner", 403);
    }

    return next();
  };

  public isCategoryOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sub = Number(res.locals.sub);

    const { foundCategory } = res.locals;

    if (foundCategory.userId !== Number(sub)) {
      throw new AppError("This user is not the category owner", 403);
    }

    return next();
  };
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware };