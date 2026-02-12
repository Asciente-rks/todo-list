import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/users/user.repository';
import { UserService } from '../../services/users/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await userService.login(req.body);
    
    const { password, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
