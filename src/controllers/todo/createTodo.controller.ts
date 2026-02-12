import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { AuthRequest } from '../../middlewares/auth.middleware';

const todoService = new TodoService(new TodoRepository());

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user!.id;
    const todoData = req.body;
    const createdTodo = await todoService.createTodo(userId, todoData);
    return res.status(201).json(createdTodo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};