import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const authUserId = (req as AuthRequest).user?.id;

    if (userId !== authUserId) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own account' });
    }

    const updatedUser = await userService.updateUser(userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = updatedUser.toJSON();
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
