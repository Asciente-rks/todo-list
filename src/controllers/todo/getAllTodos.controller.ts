import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { AuthRequest } from '../../middlewares/auth.middleware';

const todoService = new TodoService(new TodoRepository());

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user!.id;
    const todos = await todoService.getAllTodos(userId);
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
