import { Category } from "@prisma/client";
import { CategoryCreate } from "../interfaces/category.interfaces";
import { prisma } from "../database/prisma";
import { category } from "../tests/mocks/category.mocks";

export class CategoryService {
    public create = async (payload: CategoryCreate): Promise<Category> => {
        return await prisma.category.create({ data: payload });
    };

    public delete = async (categoryId: number): Promise<void> => {
        await prisma.category.delete({ where: { id: categoryId } });
    };
};