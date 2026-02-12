import { Router } from 'express';
import { getAllTodos } from '../../controllers/todo/getAllTodos.controller';
import { getTodoById } from '../../controllers/todo/getTodoById.controller';
import { createTodo } from '../../controllers/todo/createTodo.controller';
import { updateTodo } from '../../controllers/todo/updateTodo.controller';
import { deleteTodo } from '../../controllers/todo/deleteTodo.controller';
import { validateTodo } from '../../middlewares/validation.middleware';

const todoRouter = Router();

todoRouter.get('/list', getAllTodos);
todoRouter.get('/:id', getTodoById);
todoRouter.post('/create', validateTodo, createTodo);
todoRouter.patch('/:id', validateTodo, updateTodo);
todoRouter.delete('/:id', deleteTodo);

export { todoRouter };