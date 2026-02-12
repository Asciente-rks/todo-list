import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { UserService } from '../../services/users/user.service';

const userRepository = new UserRepository();
const todoRepository = new TodoRepository();
const userService = new UserService(userRepository);

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const todos = await todoRepository.findAllByUserId(userId);
    const userJson = user.toJSON() as any;
    userJson.todos = todos;

    const { password, ...userWithoutPassword } = userJson;
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};