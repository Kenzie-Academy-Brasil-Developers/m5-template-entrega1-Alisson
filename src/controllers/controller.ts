import { Response, Request, NextFunction } from "express"; 
import { TaskService } from "../services/TaskService";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";


export class TaskController {
    private taskService: TaskService = new TaskService();

public create = async (req: Request, res: Response): Promise<Response> => {
    const newTask = await this.taskService.create(req.body);
    return res.status(201).json(newTask);
};

public read = async (
    { query }: Request,
    res: Response 
): Promise<Response> => {
    const category = query.category ? String(query.category) : undefined;
    const allTasks = await this.taskService.read(category);

    return res.status(200).json(allTasks);
};

public retrieve = async (req: Request, res: Response): Promise<Response> => {
    const foundTask = await this.taskService.retrieve(res.locals.foundTask);
    return res.status(200).json(foundTask);
};

public partialUpdate = async (
    { params: { taskId }, body }: Request,
    res: Response 
): Promise<Response> => {
    const id = Number(taskId);
    const updateTask = await this.taskService.partialUpdate(id, body);

    return res.status(200).json(updateTask);
};

public delete = async (
  { params: { taskId } }: Request,
  res: Response
): Promise<Response> => {
  await this.taskService.delete(Number(taskId));
  return res.status(204).json();
};
};



