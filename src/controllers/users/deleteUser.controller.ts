import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const authUserId = (req as AuthRequest).user?.id;

    if (userId !== authUserId) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own account' });
    }

    const deleted = await userService.deleteUser(userId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};