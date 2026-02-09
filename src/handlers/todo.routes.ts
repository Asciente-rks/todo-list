import { Router } from 'express';
import { ToDoRepository } from '../repositories/todo.repository';
import { TodoService } from '../services/todo.services';
import { TodoHandler } from '../handlers/todo.handler';
import { validateAndSanitizeTodo } from '../middlewares/todo-validation-middleware';

const todoRouter = Router();

const todoRepository = new ToDoRepository();
const todoService = new TodoService(todoRepository);
const todoHandler = new TodoHandler(todoService);

todoRouter.get('/list', todoHandler.getAllTodos);
todoRouter.get('/details/:id', todoHandler.getTodoById);
todoRouter.post('/create', validateAndSanitizeTodo, todoHandler.createTodo);
todoRouter.patch('/update/:id', validateAndSanitizeTodo, todoHandler.updateTodo);
todoRouter.delete('/delete/:id', todoHandler.deleteTodo);

export { todoRouter };