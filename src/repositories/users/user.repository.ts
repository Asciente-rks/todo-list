import { User, UserCreationAttributes } from '../../models/users/user.sequelize';

export class UserRepository {
  async create(userData: UserCreationAttributes) {
    return await User.create(userData);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async findByUsername(username: string) {
    return await User.findOne({ where: { username } });
  }

  async findById(id: string) {
    return await User.findByPk(id);
  }

  async findAll() {
    return await User.findAll();
  }

  async update(id: string, userData: Partial<UserCreationAttributes>) {
    const user = await this.findById(id);
    if (!user) return null;
    return await user.update(userData);
  }

  async delete(id: string) {
    const deletedRowCount = await User.destroy({ where: { id } });
    return deletedRowCount > 0;
  }
}