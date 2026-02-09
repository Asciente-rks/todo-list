import { Request, Response } from 'express';
import { TodoService } from '../services/todo.services';

export class TodoHandler {
    constructor(private todoService: TodoService) {}

    getAllTodos = (req: Request, res: Response) => {
        try {
            const todos = this.todoService.getAllTodos();
            return res.status(200).json(todos);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    getTodoById = (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const todo = this.todoService.getTodoById(id);
            return res.status(200).json(todo);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

    createTodo = (req: Request, res: Response) => {
        try {
            const createdTodo = this.todoService.createTodo(req.body);
            return res.status(201).json(createdTodo);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    updateTodo = (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const updatedTodo = this.todoService.updateTodo(id, req.body);
            return res.status(200).json(updatedTodo);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

    deleteTodo = (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            this.todoService.deleteTodo(id);
            return res.status(200).json({ message: 'Todo deleted successfully'});
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}