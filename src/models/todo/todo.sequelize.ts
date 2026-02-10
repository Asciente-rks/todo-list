import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db';

export interface TodoAttributes {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date | null;
  userId?: string;
}

export interface TodoCreationAttributes extends Omit<TodoAttributes, 'id'> {}

export class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  declare id: string;
  declare title: string;
  declare description?: string;
  declare completed: boolean;
  declare dueDate?: Date | null;
  declare userId?: string;
}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    userId: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: true,
  }
);