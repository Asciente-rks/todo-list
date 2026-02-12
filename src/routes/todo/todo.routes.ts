import { Router } from 'express';
import { getAllTodos } from '../../controllers/todo/getAllTodos.controller';
import { getTodoById } from '../../controllers/todo/getTodoById.controller';
import { createTodo } from '../../controllers/todo/createTodo.controller';
import { updateTodo } from '../../controllers/todo/updateTodo.controller';
import { deleteTodo } from '../../controllers/todo/deleteTodo.controller';
import { validateTodo } from '../../middlewares/validation.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';

const todoRouter = Router();

todoRouter.get('/list', authenticateToken, getAllTodos);
todoRouter.get('/:id', authenticateToken, getTodoById);
todoRouter.post('/create', authenticateToken, validateTodo, createTodo);
todoRouter.patch('/:id', authenticateToken, validateTodo, updateTodo);
todoRouter.delete('/:id', authenticateToken, deleteTodo);

export { todoRouter };