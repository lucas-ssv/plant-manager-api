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
      res.status(400).json({ error: error.message })
    }
  }
}
