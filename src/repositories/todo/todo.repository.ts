import { Todo, TodoCreationAttributes } from '../../models/todo/todo.sequelize';

export class TodoRepository {
  async findAll() {
    return await Todo.findAll();
  }

  async findAllByUserId(userId: string) {
    return await Todo.findAll({ where: { userId } });
  }

  async findById(id: string) {
    return await Todo.findByPk(id);
  }

  async create(data: TodoCreationAttributes) {
    return await Todo.create(data);
  }

  async update(id: string, userId: string, data: Partial<TodoCreationAttributes>) {
    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) return null;
    return await todo.update(data);
  }
  
  async delete(id: string, userId: string) {
    const deletedRowCount = await Todo.destroy({ where: { id, userId } });
    return deletedRowCount > 0;
  }
}
