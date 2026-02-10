import { TodoRepository } from '../../repositories/todo/todo.repository';
import { CreateTodoDTO } from '../../dtos/todo/create-todo.dto';
import { UpdateTodoDTO } from '../../dtos/todo/update-todo.dto';
import { Todo } from '../../models/todo/todo.sequelize';

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async getAllTodos() {
    const allTodos = await this.todoRepository.findAll();
    return allTodos.map(todo => this.mapToDTO(todo));
  }

  async getTodoById(id: string) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) return null;

    return this.mapToDTO(todo);
  }

  async createTodo(dto: CreateTodoDTO) {
    const createdTodo = await this.todoRepository.create(dto);
    return this.mapToDTO(createdTodo);
  }

  async updateTodo(id: string, dto: UpdateTodoDTO) {
    const updatedTodo = await this.todoRepository.update(id, dto);
    if (!updatedTodo) return null;

    return this.mapToDTO(updatedTodo);
  }

  async deleteTodo(id: string) {
    return await this.todoRepository.delete(id);
  }

  private mapToDTO(todo: Todo) {
    return {
      ...todo.get(),
      isOverdue: todo.dueDate ? todo.dueDate < new Date() : false,
    };
  }
}
