import { userRepository } from "@/repositories";

import { hashPassword, comparePassword } from "@/lib/bcrypt";

import { generateToken } from "@/lib/jwt";

export class AuthService {
    async register(name: string, email: string, password: string) {
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }

    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString(), user.role);

    return {
        token,
        user,
    };
    }

    async profile(userId: string) {
        const user = await userRepository.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
    }
}

export const authService = new AuthService();
