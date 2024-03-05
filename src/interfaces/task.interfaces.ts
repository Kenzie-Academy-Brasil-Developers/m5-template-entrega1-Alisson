import { z } from "zod"; 
import { 
    taskCreateSchema,
    taskReturnCategorySchema,
    taskReturnSchema,
    taskUpdateSchema,
     } from "../schemas/task.schema"; 

type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskUpdate = z.infer<typeof taskUpdateSchema>;

type TaskReturn = z.infer<typeof taskReturnSchema>;
type TaskReturnCategory = z.infer<typeof taskReturnCategorySchema>;

export { TaskCreate, TaskReturn, TaskReturnCategory, TaskUpdate };