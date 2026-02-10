import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new TodoRepository());

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getAllTodos();
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
