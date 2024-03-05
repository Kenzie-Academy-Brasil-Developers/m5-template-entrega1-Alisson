import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { ensureMiddleware } from "../middlewares/Middleware";
import { categoryCreateSchema } from "../schemas/category.schema";

export const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.post(
    "",
    ensureMiddleware.bodyIsValid(categoryCreateSchema),
    categoryController.create
);

categoryRouter.use("/:categoryId", ensureMiddleware.categoryIdParams);

categoryRouter.delete("/:categoryId", categoryController.delete);