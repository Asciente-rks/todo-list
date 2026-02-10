import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { CreateTodoDTO } from '../../dtos/todo/create-todo.dto';

const todoService = new TodoService(new TodoRepository());

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todoData: CreateTodoDTO = req.body;
    const createdTodo = await todoService.createTodo(todoData);
    return res.status(201).json(createdTodo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};