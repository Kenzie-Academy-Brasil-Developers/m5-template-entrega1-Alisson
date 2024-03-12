import { Request, Response } from "express";
import { UserService } from "../services/user.Service";

export class UserController {
    private userService: UserService = new UserService();
  
    public create = async (req: Request, res: Response): Promise<Response> => {
      const newUser = await this.userService.create(req.body);
      return res.status(201).json(newUser);
    };
  
    public login = async (req: Request, res: Response): Promise<Response> => {
      const session = await this.userService.login(req.body);
      return res.status(200).json(session);
    };
  
    public profile = async (req: Request, res: Response): Promise<Response> => {
      const profile = await this.userService.profile(Number(res.locals.sub));
      return res.status(200).json(profile);
    };
  }