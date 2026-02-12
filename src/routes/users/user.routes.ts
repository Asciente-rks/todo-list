import { Router } from 'express';
import { register } from '../../controllers/users/register.controller';
import { login } from '../../controllers/users/login.controller';
import { getUser } from '../../controllers/users/getUser.controller';
import { getAllUsers } from '../../controllers/users/getAllUsers.controller';
import { updateUser } from '../../controllers/users/updateUser.controller';
import { deleteUser } from '../../controllers/users/deleteUser.controller';
import { validateUser, validateLogin, validateUpdateUser } from '../../middlewares/validation.middleware';
const userRouter = Router();

userRouter.post('/register',validateUser, register);
userRouter.post('/login',validateLogin, login);
userRouter.get('/all', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.patch('/:id',validateUpdateUser, updateUser);
userRouter.delete('/:id', deleteUser);

export { userRouter };