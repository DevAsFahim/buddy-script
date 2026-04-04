import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodType<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = await schema.parseAsync({ body: req.body });

    req.body = parsedData.body;

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
