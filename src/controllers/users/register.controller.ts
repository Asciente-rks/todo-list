import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
