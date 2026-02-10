import { Request, Response } from 'express';
import { TodoService } from '../../services/todo/todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { UpdateTodoDTO } from '../../dtos/todo/update-todo.dto';

const todoService = new TodoService(new TodoRepository());

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id as string;
    const updateData: UpdateTodoDTO = req.body;
    const updatedTodo = await todoService.updateTodo(id, updateData);

    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });

    return res.status(200).json(updatedTodo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
