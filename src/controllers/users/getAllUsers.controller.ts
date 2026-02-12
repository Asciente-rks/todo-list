import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
    res.json(usersWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};