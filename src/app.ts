import express, { json } from "express"; 
import "express-async-errors";
import "reflect-metadata";
import { handleErrors } from "./middlewares/HandleErrors";
import { taskRouter } from "./Routers/routes";
import helmet from "helmet";
import { categoryRouter } from "./routers/category.router";

export const app = express();

app.use(helmet());
app.use(json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use(handleErrors);