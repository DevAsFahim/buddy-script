import express, { Application, Request, Response } from 'express';
import { userController } from './app/modules/user/user.controller';

const app:Application = express()


// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.post('/create-user', (req: Request, res: Response) => {
  console.log(req.body)
  userController.createUser(req, res);
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to BuddyScript!')
})

// not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route is not found!"
  });
});

export default app;