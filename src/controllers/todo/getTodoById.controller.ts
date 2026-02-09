import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { ToDoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new ToDoRepository());

export const getTodoById = (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const todo = todoService.getTodoById(id);
        res.status(200).json(todo);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
