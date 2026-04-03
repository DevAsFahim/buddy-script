import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

 const validateRequest =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // attach validated data (optional but useful)
    console.log(req.body)
    req.body = result.data;
    console.log(req.body)

    return

    next();
  };

export default validateRequest;