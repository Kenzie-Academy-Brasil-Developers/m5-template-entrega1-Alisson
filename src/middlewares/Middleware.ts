import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";


class EnsureMiddleware {
  public bodyIsValid =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };

  public emailIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    const emailExists = await prisma.user.findFirst({ where: { email } });

    if (emailExists) {
      throw new AppError("This email is already registred", 409);
    }

    return next();
  };

  public taskIdParams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { taskId } = req.params;
    const foundTask = await prisma.task.findFirst({
      where: { id: Number(taskId) },
      include: { category: true },
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }

    res.locals = { ...res.locals, foundTask };

    return next();
  };

  public categoryIdParams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.params;
    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    res.locals = { ...res.locals, foundCategory };

    return next();
  };

  public categoryIdBody = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.body;
    if (!categoryId) return next();

    const foundCategory = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    return next();
  };
}

export const ensureMiddleware = new EnsureMiddleware();