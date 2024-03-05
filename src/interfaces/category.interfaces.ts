import { z } from "zod"; 
import { categoryCreateSchema } from "../schemas/category.schema"; 

type CategoryCreate = z.infer<typeof categoryCreateSchema>;

export { CategoryCreate };