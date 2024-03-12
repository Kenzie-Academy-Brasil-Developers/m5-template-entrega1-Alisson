import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { TaskCreate, TaskReturn, TaskReturnCategory, TaskUpdate } from "../interfaces/task.interfaces";
import { taskReturnCategorySchema, taskReturnSchema } from "../schemas/task.schema";

export class TaskService {
    public create = async (
      payload: TaskCreate,
      userId: number
    ): Promise<TaskReturn> => {
      const newTask = await prisma.task.create({ data: { ...payload, userId } });
      return taskReturnSchema.parse(newTask);
    };
  
    public read = async (
      userId: number,
      category?: string
    ): Promise<Array<TaskReturnCategory>> => {
      let prismaQuery: any = {
        include: { category: true },
        where: { userId },
      };
  
      if (category) {
        const whereClause = { name: { equals: category, mode: "insensitive" } };
        prismaQuery = {
          ...prismaQuery,
          where: { ...prismaQuery.where, category: whereClause },
        };
      }
  
      const allTasks = await prisma.task.findMany(prismaQuery);
  
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
  }