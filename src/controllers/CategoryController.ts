import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
    private categoryServices: CategoryService = new CategoryService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryServices.create(req.body);
        return res.status(201).json(newCategory);
    };

    public delete = async (
        { params: { categoryId } }: Request,
        res: Response
    ): Promise<Response> => {
        await this.categoryServices.delete(Number(categoryId));
        return res.status(204).json();
    };
}