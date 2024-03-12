import express, { json } from "express"; 
import "express-async-errors";
import "reflect-metadata";
import { handleErros } from "./middlewares/HandleErrors";
import { taskRouter } from "./routers/task.Router";
import helmet from "helmet";
import { categoryRouter } from "./routers/category.router";
import { userRouter } from "./routers/users.Routers";

export const app = express();

app.use(helmet());
app.use(json());

app.use("/users", userRouter)

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use(handleErros);