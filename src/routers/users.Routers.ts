// import { Router } from "express";
// import { ensureMiddleware } from "../middlewares/Middleware";
// import { UserController } from "../controllers/user.Controller";

// export const userRouter = Router();

// const userController = new UserController();

// userRouter.post(
//     "",
//     userController.create(),
//     ensureMiddleware.bodyIsValid(userCreateSchema),
//     ensureMiddleware.emailIsUnique,
//     userController.create
// );

// userRouter.post(
//     "/login",
//     ensureMiddleware.bodyIsValid(sessionCreateSchema),
//     userController.login
// );

// userRouter.get(
//     "/profile",
//     authMiddleware.validateToken,
//     userController.profile
// );

