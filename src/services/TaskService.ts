import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";
import { TaskCreate, TaskReturn, TaskReturnCategory, TaskUpdate } from "../interfaces/task.interfaces";
import { taskReturnCategorySchema, taskReturnSchema } from "../schemas/task.schema";
import { AppError } from "../errors/AppError";

export class TaskService {
    public create = async (payload: TaskCreate): Promise<TaskReturn> => {
        const newTask = await prisma.task.create({ data: payload });
        return taskReturnSchema.parse(newTask);
    };
    
    public read = async (
        category?: string
    ): Promise<Array<TaskReturnCategory>> => {
        let prismaQuery: any = { include: { category: true } };

        if (category) {
            const whereClause = { name: { equals: category, mode: "insensitive" } };
            prismaQuery = { ...prismaQuery, where: { category: whereClause } };
        }
        const allTasks = await prisma.task.findMany(prismaQuery);

        if (!allTasks.length) {
            throw new AppError("Category not found", 404);
        }

        return taskReturnCategorySchema.array().parse(allTasks);
    };
    
    public retrieve = async (foundTask: Task): Promise<TaskReturnCategory> => {
        return taskReturnCategorySchema.parse(foundTask);
    };

    public partialUpdate = async (
        taskId: number,
        payload: TaskUpdate
    ): Promise<TaskReturn> => {
        const updateTask = await prisma.task.update({
            data: payload,
            where: { id: taskId },
        });

        return taskReturnSchema.parse(updateTask);
    };
    
    public delete = async (taskId: number): Promise<void> => {
        await prisma.task.delete({ where: { id: taskId } });
      };
};