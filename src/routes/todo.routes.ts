import { Router } from 'express';
import { getAllTodos } from '../controllers/todo/getAllTodos.controller';
import { getTodoById } from '../controllers/todo/getTodoById.controller';
import { createTodo } from '../controllers/todo/createTodo.controller';
import { updateTodo } from '../controllers/todo/updateTodo.controller';
import { deleteTodo } from '../controllers/todo/deleteTodo.controller';
import { validateAndSanitizeTodo } from '../middlewares/todo/todo-validation-middleware';

const todoRouter = Router();

todoRouter.get('/list', getAllTodos);
todoRouter.get('/details/:id', getTodoById);
todoRouter.post('/create', validateAndSanitizeTodo, createTodo);
todoRouter.patch('/update/:id', validateAndSanitizeTodo, updateTodo);
todoRouter.delete('/delete/:id', deleteTodo);

export { todoRouter };