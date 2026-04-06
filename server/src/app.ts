import express, { Application, Request, Response } from "express";
import { userController } from "./app/modules/user/user.controller";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', 'https://fanciful-sprinkles-ed16f3.netlify.app'], credentials: true }));

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
