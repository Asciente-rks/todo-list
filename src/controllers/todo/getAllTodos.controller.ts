import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { ToDoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new ToDoRepository());

export const getAllTodos = (req: Request, res: Response) => {
    try {
        const todos = todoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
