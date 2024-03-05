import { z } from "zod";
import { categorySchema } from "./category.schema";

const taskReturnSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
});

const taskCreateSchema = taskReturnSchema.omit({ id: true });
const taskUpdateSchema = taskCreateSchema.partial();


const taskReturnCategorySchema = taskReturnSchema
.extend({ category: categorySchema.nullish() })
.omit({ categoryId: true });

export {
    taskCreateSchema,
    taskReturnCategorySchema,
    taskReturnSchema,
    taskUpdateSchema,
};    