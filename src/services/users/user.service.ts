import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/users/user.repository";
import { CreateUserDTO } from "../../dtos/users/create-user.dto";
import { LoginDTO } from "../../dtos/users/login.dto";
import { UpdateUserDTO } from "../../dtos/users/update-user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  // -----------------------------
  // REGISTER
  // -----------------------------
  async register(dto: CreateUserDTO) {
    const { username, email, password } = dto;
    if (!username || !email || !password) {
      throw new Error("Username, email and password are required");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  // -----------------------------
  // LOGIN
  // -----------------------------
  async login(dto: LoginDTO) {
    const { username, password } = dto;

    // lookup by username only (frontend sends username)
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return { user, token };
  }

  // -----------------------------
  // GET PROFILE
  // -----------------------------
  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  // -----------------------------
  // UPDATE PROFILE
  // -----------------------------
  async updateUser(id: string, dto: UpdateUserDTO) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    const { password, email, username, currentPassword } = dto;

    // require currentPassword only if changing sensitive info
    const isChangingSensitiveInfo = !!(password || email || username);
    if (isChangingSensitiveInfo && !currentPassword) {
      throw new Error(
        "Current password required to update profile (field missing in request)",
      );
    }

    // check current password if provided
    if (currentPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) throw new Error("Current password is incorrect");
    }

    const updatedData = { ...dto };

    // hash new password if provided
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    delete updatedData.currentPassword; // never store this

    return await this.userRepository.update(id, updatedData);
  }

  // -----------------------------
  // DELETE USER
  // -----------------------------
  async deleteUser(id: string) {
    const deleted = await this.userRepository.delete(id);
    if (deleted) {
      console.log(`EVENT_EMITTED: UserDeleted, userId: ${id}`);
    }
    return deleted;
  }
}
