import express, { Application, Request, Response } from "express";
import { userController } from "./app/modules/user/user.controller";
import router from "./app/routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to BuddyScript!");
});

// not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route is not found!",
  });
});

export default app;
