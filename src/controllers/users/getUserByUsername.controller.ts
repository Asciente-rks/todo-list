import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;
    const authUsername = (req as AuthRequest).user?.username;

    if (username !== authUsername) {
      return res.status(403).json({ error: 'Forbidden: You can only view your own profile' });
    }

    const user = await userService.findByUsername(username);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const { password, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};