import { Todo, TodoCreationAttributes } from '../../models/todo/todo.sequelize';
import { CreateTodoDTO } from '../../dtos/todo/create-todo.dto';
import { UpdateTodoDTO } from '../../dtos/todo/update-todo.dto';

export class TodoRepository {
  async findAll() {
    return await Todo.findAll();
  }

  async findById(id: string) {
    return await Todo.findByPk(id);
  }

  async create(data: CreateTodoDTO) {
    const todoData: TodoCreationAttributes = {
      title: data.title,
      description: data.description,
      completed: data.completed ?? false,
      dueDate: data.dueDate,
      userId: data.userId,
    };

    return await Todo.create(todoData);
  }

  async update(id: string, data: UpdateTodoDTO) {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
  
    const updateData: any = { ...data };
    if (data.dueDate !== undefined) {
      updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    }
  
    return await todo.update(updateData);
  }
  
  async delete(id: string) {
    const deletedRowCount = await Todo.destroy({ where: { id } });
    return deletedRowCount > 0;
  }
}
