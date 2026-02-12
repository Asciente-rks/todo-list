import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';

const todoService = new TodoService(new TodoRepository());

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id as string;
    const { userId } = req.body;
    const deleted = await todoService.deleteTodo(id, userId);

    if (!deleted) return res.status(404).json({ message: 'Todo not found' });

    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
