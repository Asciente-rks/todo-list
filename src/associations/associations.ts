import { User } from "../models/users/user.sequelize";
import { Todo } from "../models/todo/todo.sequelize";

export const setupAssociations = () => {
  // A User can have many Todos
  User.hasMany(Todo, { foreignKey: "userId", as: "todos" });

  // A Todo belongs to a single User
  Todo.belongsTo(User, { foreignKey: "userId", as: "user" });
};
