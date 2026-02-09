import { Request, Response, NextFunction } from 'express';
import { validateTodo } from '../utils/validate-util';
import { sanitizeTodo } from '../utils/sanitize-util';

export const validateAndSanitizeTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const errors = await validateTodo(data);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  req.body = sanitizeTodo(data);
  next();
};
