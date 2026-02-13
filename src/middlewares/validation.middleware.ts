import { Request, Response, NextFunction } from 'express';
import { todoSchema, registerSchema, loginSchema, updateUserSchema, validate } from '../utils/validate-util';

export const validateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { data, errors } = await validate(todoSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  req.body = data;
  next();
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { data, errors } = await validate(loginSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  req.body = data;
  next();
};

export const validateUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { data, errors } = await validate(updateUserSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  req.body = data;
  next();
};

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { data, errors } = await validate(registerSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  req.body = data;
  next();
};