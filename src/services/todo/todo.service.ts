import { TodoRepository } from '../../repositories/todo/todo.repository';
import { CreateTodoDTO } from '../../dtos/todo/create-todo.dto';
import { UpdateTodoDTO } from '../../dtos/todo/update-todo.dto';
import { Todo, TodoCreationAttributes } from '../../models/todo/todo.sequelize';

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async getAllTodos(userId: string) {
    const allTodos = await this.todoRepository.findAllByUserId(userId);
    return allTodos.map(todo => this.mapToDTO(todo));
  }

  async getTodoById(id: string, userId: string) {
    const todo = await this.todoRepository.findByIdAndUserId(id, userId);
    if (!todo) return null;

    return this.mapToDTO(todo);
  }

  async createTodo(userId: string, dto: CreateTodoDTO) {
    const todoData: TodoCreationAttributes = {
      title: dto.title,
      description: dto.description,
      completed: false,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      userId: userId,
    };
    const createdTodo = await this.todoRepository.create(todoData);
    return this.mapToDTO(createdTodo);
  }

  async updateTodo(id: string, userId: string, dto: UpdateTodoDTO) {
    const { dueDate, ...rest } = dto;
    const updateData: Partial<TodoCreationAttributes> = { ...rest };
    if (dueDate !== undefined) {
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    }
    const updatedTodo = await this.todoRepository.update(id, userId, updateData);
    if (!updatedTodo) return null;

    return this.mapToDTO(updatedTodo);
  }

  async deleteTodo(id: string, userId: string) {
    return await this.todoRepository.delete(id, userId);
  }

  private mapToDTO(todo: Todo) {
    return {
      ...todo.get(),
      isOverdue: todo.dueDate ? todo.dueDate < new Date() : false,
    };
  }
}
