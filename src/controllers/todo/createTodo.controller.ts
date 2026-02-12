import { Request, Response } from 'express';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { TodoService } from '../../services/todo/todo.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user!.id;
    const todoData = req.body;

    const todo = await todoService.createTodo(userId, todoData);
    
    res.status(201).json(todo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};