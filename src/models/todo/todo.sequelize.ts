import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../utils/db';
import { User } from '../user/user.sequelize';

export class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: 'id' }
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: true
  }
);

Todo.belongsTo(User, { foreignKey: 'userId' });
