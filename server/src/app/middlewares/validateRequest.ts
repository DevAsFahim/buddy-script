import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodType<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // validation check
    await schema.parseAsync(req.body);
    
    // if everything is alright next() -> controller.ts
    next();
  });
};

export default validateRequest;

// if (!result.success) {
//   return res.status(400).json({
//     success: false,
//     errors: result.error.issues.map((issue) => ({
//       path: issue.path.join("."),
//       message: issue.message,
//     })),
//   });
// }
