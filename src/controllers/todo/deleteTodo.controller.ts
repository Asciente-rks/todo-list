import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { ToDoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new ToDoRepository());

export const deleteTodo = (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        todoService.deleteTodo(id);
        return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error: any) {
        return res.status(404).json({ message: error.message });
    }
};
