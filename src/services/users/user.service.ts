import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/users/user.repository';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { CreateUserDTO } from '../../dtos/users/create-user.dto';
import { LoginDTO } from '../../dtos/users/login.dto';
import { UpdateUserDTO } from '../../dtos/users/update-user.dto';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private todoRepository?: TodoRepository
  ) {}

  async register(dto: CreateUserDTO) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });
    return newUser;
  }

  async login(dto: LoginDTO) {
    const user = await this.userRepository.findByUsername(dto.username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
    return { user, token };
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    return await this.userRepository.update(id, dto as any);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    let todos: any[] = [];
    if (this.todoRepository) {
      todos = await this.todoRepository.findAllByUserId(id);
    }

    const userJson = user.toJSON() as any;
    userJson.todos = todos;
    return userJson;
  }
}
