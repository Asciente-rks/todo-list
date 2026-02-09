import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { ToDoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new ToDoRepository());

export const createTodo = (req: Request, res: Response) => {
    try {
        const createdTodo = todoService.createTodo(req.body);
        res.status(201).json(createdTodo);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
