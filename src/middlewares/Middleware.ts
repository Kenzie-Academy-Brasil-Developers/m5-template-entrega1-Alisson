import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodNumber, ZodObject, ZodString, ZodTypeAny } from "zod"
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";


class EnsureMiddleware {
    
    public bodyIsValid =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): void => {
        req.body = schema.parse(req.body);
        return next();
    };

    public taskIdParams = async (
        req: Request,
        res: Response,
        next: NextFunction,
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
        _: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { categoryId } = req.params;
        const foundCategory = await prisma.category.findFirst({
            where: { id: Number(categoryId) },
        });
    }

    public categoryIdBody = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const { categoryId } = req.body
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