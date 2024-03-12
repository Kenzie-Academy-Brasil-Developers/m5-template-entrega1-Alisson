import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
  private categoryService: CategoryService = new CategoryService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(res.locals.sub)
    const newCategory = await this.categoryService.create(req.body, userId);

    return res.status(201).json(newCategory);
  };

  public delete = async (
    { params: { categoryId } }: Request,
    res: Response
  ): Promise<Response> => {
    await this.categoryService.delete(Number(categoryId));
    return res.status(204).json();
  };
}