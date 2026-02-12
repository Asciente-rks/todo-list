import { Router } from 'express';
import { register } from '../../controllers/users/register.controller';
import { login } from '../../controllers/users/login.controller';
import { getUserById } from '../../controllers/users/getUserById.controller';
import { getUserByUsername } from '../../controllers/users/getUserByUsername.controller';
import { getUserByEmail } from '../../controllers/users/getUserByEmail.controller';
import { getAllUsers } from '../../controllers/users/getAllUsers.controller';
import { updateUser } from '../../controllers/users/updateUser.controller';
import { deleteUser } from '../../controllers/users/deleteUser.controller';
import { validateUser, validateLogin, validateUpdateUser } from '../../middlewares/validation.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register',validateUser, register);
userRouter.post('/login',validateLogin, login);
userRouter.get('/all', getAllUsers);
userRouter.get('/username/:username', authenticateToken, getUserByUsername);
userRouter.get('/email/:email', authenticateToken, getUserByEmail);
userRouter.get('/:id', authenticateToken, getUserById);
userRouter.patch('/:id', authenticateToken, validateUpdateUser, updateUser);
userRouter.delete('/:id', authenticateToken, deleteUser);

export { userRouter };