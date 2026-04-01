import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/users/user.repository";
import { CreateUserDTO } from "../../dtos/users/create-user.dto";
import { LoginDTO } from "../../dtos/users/login.dto";
import { UpdateUserDTO } from "../../dtos/users/update-user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(dto: CreateUserDTO) {
    if (!dto.email || !dto.username || !dto.password) {
      throw new Error("Username, email and password are required");
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
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
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );
    return { user, token };
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO & { currentPassword?: string }, // include currentPassword
  ) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    // If trying to change password or email/username, check currentPassword
    if (dto.currentPassword) {
      const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }
    } else if (dto.password || dto.email || dto.username) {
      // If trying to change something sensitive but no currentPassword provided
      throw new Error("Current password required to update profile");
    }

    // Hash new password if provided
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    // Remove currentPassword before sending to repository
    delete dto.currentPassword;

    // Update user in repository
    return await this.userRepository.update(id, dto as any);
  }

  async deleteUser(id: string) {
    const wasDeleted = await this.userRepository.delete(id);

    if (wasDeleted) {
      console.log(`EVENT_EMITTED: UserDeleted, userId: ${id}`);
    }
    return wasDeleted;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }
}
