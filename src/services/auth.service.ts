import { userRepository } from "@/repositories";

import { hashPassword, comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
import { AppError } from "@/lib/app-error";

export class AuthService {
  async register(
    name: string,
    email: string,
    password: string
  ) {
    const existingUser =
      await userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(
        "User already exists",
        409
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const user =
      await userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

    return user;
  }

  async login(
    email: string,
    password: string
  ) {
    const user =
      await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const isPasswordValid =
      await comparePassword(
        password,
        user.password
      );

    if (!isPasswordValid) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    return {
      token,
      user,
    };
  }

  async profile(userId: string) {
    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  }
}

export const authService =
  new AuthService();