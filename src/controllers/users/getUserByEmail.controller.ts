import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email as string;
    const user = await userService.findByEmail(email);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const { password, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};