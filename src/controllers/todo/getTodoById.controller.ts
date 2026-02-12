import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { AuthRequest } from '../../middlewares/auth.middleware';

const todoService = new TodoService(new TodoRepository());

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as AuthRequest).user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const todo = await todoService.getTodoById(id, userId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json(todo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};