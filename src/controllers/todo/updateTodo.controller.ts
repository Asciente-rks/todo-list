import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { ToDoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new ToDoRepository());

export const updateTodo = (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updatedTodo = todoService.updateTodo(id, req.body);
        res.status(200).json(updatedTodo);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
