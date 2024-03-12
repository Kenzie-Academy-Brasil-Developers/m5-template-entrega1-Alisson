import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { ensureMiddleware } from "../middlewares/Middleware";
import { categoryCreateSchema } from "../schemas/category.schema";
import { authMiddleware } from "../middlewares/auth.Middleware";

export const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.use(authMiddleware.validateToken);

categoryRouter.post(
  "",
  ensureMiddleware.bodyIsValid(categoryCreateSchema),
  categoryController.create
);

categoryRouter.use(
  "/:categoryId",
  ensureMiddleware.categoryIdParams,
  authMiddleware.isCategoryOwner
);

categoryRouter.delete("/:categoryId", categoryController.delete);