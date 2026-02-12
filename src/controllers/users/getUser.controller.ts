import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { UserService } from '../../services/users/user.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

const userRepository = new UserRepository();
const todoRepository = new TodoRepository();
const userService = new UserService(userRepository);

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const authUserId = (req as AuthRequest).user?.id;

    if (userId !== authUserId) {
      return res.status(403).json({ error: 'Forbidden: You can only view your own profile' });
    }

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