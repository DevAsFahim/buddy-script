import express, { Application, Request, Response } from "express";
import { userController } from "./app/modules/user/user.controller";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to BuddyScript!");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route is not found!",
  });
});

export default app;
