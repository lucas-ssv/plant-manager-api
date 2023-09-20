import { type NextFunction, type Request, type Response } from 'express'
import { type z } from 'zod'

export const validatorAdapter = (
  schema: z.ZodObject<any, 'strip', z.ZodTypeAny, any, any>
): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      res.status(500).json({
        error: {
          name: error.name,
          path: error.issues[0].path,
          message: error.issues[0].message,
        },
      })
    }
  }
}
