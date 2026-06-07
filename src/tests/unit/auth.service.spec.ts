import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
} from "@jest/globals";

import { authService } from "@/services/auth.service";
import { AppError } from "@/lib/app-error";

import { userRepository } from "@/repositories";

import {
  hashPassword,
  comparePassword,
} from "@/lib/bcrypt";

import {
  generateToken,
} from "@/lib/jwt";

import { IUser } from "@/models/User";

jest.mock("@/repositories", () => ({
  userRepository: {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("@/lib/bcrypt", () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
}));

jest.mock("@/lib/jwt", () => ({
  generateToken: jest.fn(),
}));

const mockedUserRepository =
  userRepository as jest.Mocked<
    typeof userRepository
  >;

const mockedHashPassword =
  hashPassword as jest.MockedFunction<
    typeof hashPassword
  >;

const mockedComparePassword =
  comparePassword as jest.MockedFunction<
    typeof comparePassword
  >;

const mockedGenerateToken =
  generateToken as jest.MockedFunction<
    typeof generateToken
  >;

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register user", async () => {
      mockedUserRepository.findByEmail.mockResolvedValue(
        null
      );

      mockedHashPassword.mockResolvedValue(
        "hashed-password"
      );

      mockedUserRepository.create.mockResolvedValue(
        {
          _id: "1",
          name: "Ashish",
          email: "ashish@test.com",
        } as unknown as IUser
      );

      const result =
        await authService.register(
          "Ashish",
          "ashish@test.com",
          "123456"
        );

      expect(
        mockedUserRepository.findByEmail
      ).toHaveBeenCalledWith(
        "ashish@test.com"
      );

      expect(
        mockedHashPassword
      ).toHaveBeenCalledWith(
        "123456"
      );

      expect(
        mockedUserRepository.create
      ).toHaveBeenCalledWith({
        name: "Ashish",
        email: "ashish@test.com",
        password: "hashed-password",
      });

      expect(result).toBeDefined();
    });

    it("should throw when user already exists", async () => {
      mockedUserRepository.findByEmail.mockResolvedValue(
        {
          email: "ashish@test.com",
        } as unknown as IUser
      );

      await expect(
        authService.register(
          "Ashish",
          "ashish@test.com",
          "123456"
        )
      ).rejects.toThrow(AppError);

      await expect(
        authService.register(
          "Ashish",
          "ashish@test.com",
          "123456"
        )
      ).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("login", () => {
    it("should login successfully", async () => {
      const user = {
        _id: {
          toString: () => "user-id",
        },
        role: "ADMIN",
        password: "hashed-password",
      };

      mockedUserRepository.findByEmail.mockResolvedValue(
        user as unknown as IUser
      );

      mockedComparePassword.mockResolvedValue(
        true
      );

      mockedGenerateToken.mockReturnValue(
        "jwt-token"
      );

      const result =
        await authService.login(
          "test@test.com",
          "123456"
        );

      expect(
        mockedUserRepository.findByEmail
      ).toHaveBeenCalledWith(
        "test@test.com"
      );

      expect(
        mockedComparePassword
      ).toHaveBeenCalledWith(
        "123456",
        "hashed-password"
      );

      expect(
        mockedGenerateToken
      ).toHaveBeenCalledWith(
        "user-id",
        "ADMIN"
      );

      expect(result.token).toBe(
        "jwt-token"
      );

      expect(result.user).toBeDefined();
    });

    it("should throw invalid credentials when user not found", async () => {
      mockedUserRepository.findByEmail.mockResolvedValue(
        null
      );

      await expect(
        authService.login(
          "wrong@test.com",
          "123456"
        )
      ).rejects.toThrow(AppError);

      await expect(
        authService.login(
          "wrong@test.com",
          "123456"
        )
      ).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should throw invalid credentials when password is invalid", async () => {
      mockedUserRepository.findByEmail.mockResolvedValue(
        {
          password: "hashed-password",
        } as unknown as IUser
      );

      mockedComparePassword.mockResolvedValue(
        false
      );

      await expect(
        authService.login(
          "test@test.com",
          "wrong-password"
        )
      ).rejects.toThrow(AppError);

      await expect(
        authService.login(
          "test@test.com",
          "wrong-password"
        )
      ).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });

  describe("profile", () => {
    it("should return profile", async () => {
      mockedUserRepository.findById.mockResolvedValue(
        {
          _id: "1",
          name: "Ashish",
        } as unknown as IUser
      );

      const result =
        await authService.profile(
          "1"
        );

      expect(
        mockedUserRepository.findById
      ).toHaveBeenCalledWith(
        "1"
      );

      expect(result).toBeDefined();
    });

    it("should throw user not found", async () => {
      mockedUserRepository.findById.mockResolvedValue(
        null
      );

      await expect(
        authService.profile("1")
      ).rejects.toThrow(AppError);

      await expect(
        authService.profile("1")
      ).rejects.toThrow(
        "User not found"
      );
    });
  });
});