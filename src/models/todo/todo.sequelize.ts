import { Model, DataTypes } from 'sequelize';
import { todoSequelize } from '../../utils/db';

export interface TodoAttributes {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date | null;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoCreationAttributes extends Omit<TodoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  declare id: string;
  declare title: string;
  declare description?: string;
  declare completed: boolean;
  declare dueDate?: Date | null;
  declare userId?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    userId: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize: todoSequelize,
    tableName: 'todos',
    timestamps: true,
  }
);